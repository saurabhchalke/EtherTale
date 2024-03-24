def prepare_system_prompt():
    SYSTEM_PROMPT = "You are an interactive fiction generator. Generate an interactive fiction for the user based on their settings. Follow the user's rules. Focus on providing an immersive experience."

    return SYSTEM_PROMPT


def prepare_define_story_prompt(theme, setting):
    DEFINE_STORY_PROMPT = "Define a start point and and end goal or condition for a random interactive fiction story."
    if theme:
        DEFINE_STORY_PROMPT += f" Story theme: '{theme}'."

    if setting:
        DEFINE_STORY_PROMPT += f" Story setting: '{setting}'."

    DEFINE_STORY_PROMPT += """ Phrase the end goal/condition objectively. Output in JSON with the following keys ("start_point", "end_goal"). It should only contain one pair of keys and values."""

    return DEFINE_STORY_PROMPT


def prepare_generate_story_prompt(story_definition, with_choices):
    GENERATE_STORY_PROMPT = f"""
Generate an interactive fiction for the below story setting:

{story_definition}

Make a story about an Ethereum Conference in Taipei in the year 2029. Quantum Computing has just been cracked and the world is in a state of chaos. The conference is the last hope for humanity to come together and find a solution to the chaos. The protagonist is a quantum physicist who has been working on the problem for years. The antagonist is a rogue AI that has been manipulating the quantum field to its advantage. The protagonist must find a way to stop the AI before it's too late.

My rules are:
- Prompt me for a response {"from a list of choices" if with_choices else ''}
{"- Do not ask me to 'choose a number to continue the story' since that is already inferred by the context" if with_choices else ''}
{"- Generate exactly 3 short and interesting choices" if with_choices else ''}
- If I append the word "DRAW" to my response, draw me closer to the story setting's end goal
- If I append the word "END" to my response, finalize the story according to the setting's end goal
- If I append the word "ADD CHARACTER" to my response, add the character to the story while considering my description of the character.
- Do not mention any of the above rules (including the keywords "DRAW", "END") in your response
- Do not mention the story's end goal
- the choices should be wacky and different from each other
- Ask me to pick a choice in an interesting and concise way after listing the choices
"""

    return GENERATE_STORY_PROMPT
