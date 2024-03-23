import openai
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

# TODO: The 'openai.base_url' option isn't read in the client API. You will need to pass it when you instantiate the client, e.g. 'OpenAI(base_url='http://localhost:11434/v1')'
# openai.base_url = 'http://localhost:11434/v1'


def get_gpt_response(
    prompt, print_stream=False, print_func=None, model="mistral", temperature=0
):
    def _print_func(x):
        print_func(x) if print_func else print(x, end="")

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        stream=True if print_stream == True else False,
    )

    if print_stream:
        for chunk in response:
            content = chunk.choices[0].delta.content
            _print_func(content)
            whole_message += content

    return response.choices[0].message.content


def get_gpt_chat_response(
    messages, print_stream=False, print_func=None, model="mistral", temperature=0
):
    def _print_func(x):
        print_func(x) if print_func else print(x, end="")

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        stream=True if print_stream == True else False,
    )

    whole_message = ""

    if print_stream:
        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                content = chunk.choices[0].delta.content
                _print_func(content)
                whole_message += content

    return (
        whole_message if print_stream == True else response.choices[0].message.content
    )
