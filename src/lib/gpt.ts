export const getGptResponse = async (
  prompt: string,
  printStream = false,
  printFunc: ((text: string) => void) | null = null,
  model = "mistral",
  temperature = 0
): Promise<string> => {
  const response = await fetch("http://localhost:11434/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature,
      stream: printStream,
    }),
  });

  if (printStream) {
    let wholeMessage = "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const data = line.substring(5).trim();
          if (data === "[DONE]") {
            break;
          }
          try {
            const json = JSON.parse(data);
            const content = json.choices[0].delta.content;
            if (content) {
              if (printFunc) {
                printFunc(content);
              } else {
                process.stdout.write(content);
              }
              wholeMessage += content;
            }
          } catch (error) {
            console.error("Could not JSON parse stream data:", data, error);
          }
        }
      }
    }
    return wholeMessage;
  } else {
    const data = await response.json();
    return data.choices[0].message.content;
  }
};

export const getGptChatResponse = async (
  messages: { role: string; content: string }[],
  printStream = false,
  printFunc: ((text: string) => void) | null = null,
  model = "mistral",
  temperature = 0
): Promise<string> => {
  const response = await fetch("http://localhost:11434/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: printStream,
    }),
  });

  let wholeMessage = "";
  if (printStream) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const data = line.substring(5).trim();
          if (data === "[DONE]") {
            break;
          }
          try {
            const json = JSON.parse(data);
            const content = json.choices[0].delta.content;
            if (content) {
              if (printFunc) {
                printFunc(content);
              } else {
                process.stdout.write(content);
              }
              wholeMessage += content;
            }
          } catch (error) {
            console.error("Could not JSON parse stream data:", data, error);
          }
        }
      }
    }
  } else {
    const data = await response.json();
    wholeMessage = data.choices[0].message.content;
  }
  return wholeMessage;
};
