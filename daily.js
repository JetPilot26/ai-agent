import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateMessage() {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: "Give me a short, practical daily health tip for a 65+ year old man trying to reduce visceral fat.",
  });

  return response.output_text;
}

async function run() {
  const message = await generateMessage();
  console.log("\n🧠 Daily Insight:\n");
  console.log(message);
}

run();