import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY);


const openai = new OpenAIApi(configuration);

type Data = {
  recipe: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Write a recipe based on these ingredients and instructions:\n\nFrito Pie\n\nIngredients:\nFritos\nChili\nShredded cheddar cheese\nSweet white or red onions, diced small\nSour cream\n\nInstructions:",
    temperature: 0.3,
    max_tokens: 120,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  console.log(response.data);
  

  res.status(200).json({ recipe: 'Recipe' })
}
