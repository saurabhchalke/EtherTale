import asyncio
import json
import os
import random
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from lib.prompts import prepare_generate_story_prompt, prepare_system_prompt
from lib.gpt import get_gpt_chat_response

load_dotenv()

TALLY_FILE_DIRECTORY = os.getenv("TALLY_FILE_DIRECTORY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

story_rounds = 20
messages = [
    {"role": "system", "content": prepare_system_prompt()},
]


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        if "start" in data:
            await start_story(websocket)
        elif "choice" in data:
            choice = data["choice"]
            messages.append({"role": "user", "content": f"Choice {choice}"})
            await generate_story_chunk(websocket)


async def start_story(websocket):
    messages.append(
        {"role": "user", "content": prepare_generate_story_prompt({}, True)}
    )
    await generate_story_chunk(websocket)


async def generate_story_chunk(websocket):
    global messages
    response = get_gpt_chat_response(messages, model="mistral", print_stream=True)
    for chunk in response:
        await websocket.send_json({"type": "story", "content": chunk})
        await asyncio.sleep(0.016)  # Adjust the delay as needed
    messages.append({"role": "assistant", "content": response})
    await websocket.send_json({"type": "storyEnd"})
    await websocket.send_json({"type": "choices"})
    tally_file_path = os.path.join(TALLY_FILE_DIRECTORY, "tally.json")
    os.remove(tally_file_path) if os.path.exists(tally_file_path) else None
    tally_file = await wait_for_tally_file(tally_file_path)
    await process_tally_file(websocket, tally_file)


async def wait_for_tally_file(tally_file_path):
    while not os.path.exists(tally_file_path):
        await asyncio.sleep(1)
    return tally_file_path


async def process_tally_file(websocket, tally_file_path):
    with open(tally_file_path, "r") as file:
        data = json.load(file)
    results = [int(value) for value in data["results"]["tally"]]
    winning_choice_index = results.index(max(results))
    if results.count(max(results)) > 1:
        tied_choices = [i for i, v in enumerate(results) if v == max(results)]
        winning_choice_index = random.choice(tied_choices)
    winning_choice = winning_choice_index + 1
    stats = {
        "totalVotes": sum(results),
        "contractAddress": data["maci"],
        "network": data["network"],
        "chainId": data["chainId"],
    }
    await websocket.send_json(
        {"type": "stats", "stats": stats, "choice": winning_choice}
    )
    os.remove(tally_file_path)
    messages.append({"role": "user", "content": f"Choice {winning_choice}"})
    await generate_story_chunk(websocket)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
