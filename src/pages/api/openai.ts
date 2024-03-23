import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { messages, model, temperature } = req.body;

      const response = await fetch('http://localhost:11434/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          stream: true,
        }),
      });

      if (response.status !== 200) {
        const data = await response.json();
        throw new Error(`Ollama API returned an error: ${data.error.message}`);
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.substring(5).trim();
            if (data === '[DONE]') {
              res.write('data: [DONE]\n\n');
              break;
            }
            try {
              const json = JSON.parse(data);
              res.write(`data: ${JSON.stringify(json)}\n\n`);
            } catch (error) {
              console.error('Could not JSON parse stream data:', data, error);
            }
          }
        }
      }

      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the story.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}