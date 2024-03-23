import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { messages, model, temperature } = req.body;

      const response = await openai.createChatCompletion({
        model,
        messages,
        temperature,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the story.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}