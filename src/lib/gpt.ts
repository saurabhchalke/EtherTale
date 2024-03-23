export const getGptResponse = async (
    prompt: string,
    printStream = false,
    printFunc: ((text: string) => void) | null = null,
    model = 'mistral',
    temperature = 0
  ): Promise<string> => {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model,
        temperature,
      }),
    });
  
    const data = await response.json();
  
    if (printStream) {
      let wholeMessage = '';
      for (const choice of data.choices) {
        const content = choice.delta.content;
        if (content) {
          if (printFunc) {
            printFunc(content);
          } else {
            process.stdout.write(content);
          }
          wholeMessage += content;
        }
      }
      return wholeMessage;
    } else {
      return data.choices[0].message.content;
    }
  };
  
  export const getGptChatResponse = async (
    messages: { role: string; content: string }[],
    printStream = false,
    printFunc: ((text: string) => void) | null = null,
    model = 'mistral',
    temperature = 0
  ): Promise<string> => {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model,
        temperature,
      }),
    });
  
    const data = await response.json();
  
    let wholeMessage = '';
    if (printStream) {
      for (const choice of data.choices) {
        if (choice.delta.content) {
          const content = choice.delta.content;
          if (printFunc) {
            printFunc(content);
          } else {
            process.stdout.write(content);
          }
          wholeMessage += content;
        }
      }
    } else {
      wholeMessage = data.choices[0].message.content;
    }
  
    return wholeMessage;
  };