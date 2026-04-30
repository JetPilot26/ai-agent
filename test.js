import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Say 'API key works' and nothing else.",
    });

    console.log("\nAI Response:\n", response.output_text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();