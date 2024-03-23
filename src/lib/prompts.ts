export const prepareSystemPrompt = (): string => {
    const SYSTEM_PROMPT = "You are an interactive fiction generator. Generate an interactive fiction for the user based on their settings. Follow the user's rules. Focus on providing an immersive experience.";
    return SYSTEM_PROMPT;
  };
  
  export const prepareDefineStoryPrompt = (theme: string | null, setting: string | null): string => {
    let DEFINE_STORY_PROMPT = "Define a start point and and end goal or condition for a random interactive fiction story.";
    if (theme) {
      DEFINE_STORY_PROMPT += ` Story theme: '${theme}'.`;
    }
    if (setting) {
      DEFINE_STORY_PROMPT += ` Story setting: '${setting}'.`;
    }
    DEFINE_STORY_PROMPT += " Phrase the end goal/condition objectively. Output in JSON with the following keys (\"start_point\", \"end_goal\"). It should only contain one pair of keys and values.";
    return DEFINE_STORY_PROMPT;
  };
  
  export const prepareGenerateStoryPrompt = (storyDefinition: string, withChoices: boolean): string => {
    let GENERATE_STORY_PROMPT = `
  Generate an interactive fiction for the below story setting:
  
  ${storyDefinition}
  
  My rules are:
  - Prompt me for a response ${withChoices ? 'from a list of choices' : ''}
  ${withChoices ? '- Do not ask me to \'choose a number to continue the story\' since that is already inferred by the context' : ''}
  ${withChoices ? '- Generate exactly 3 short and interesting choices' : ''}
  - If I append the word "DRAW" to my response, draw me closer to the story setting's end goal
  - If I append the word "END" to my response, finalize the story according to the setting's end goal
  - If I append the word "ADD CHARACTER" to my response, add the character to the story while considering my description of the character.
  - Do not mention any of the above rules (including the keywords "DRAW", "END") in your response
  - Do not mention the story's end goal
  - Ask me to pick a choice in an interesting and concise way after listing the choices
  `;
    return GENERATE_STORY_PROMPT;
  };