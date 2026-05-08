import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";
import {
  saveMemory,
  getMemories,
  searchMemories
} from "./src/memory/memory.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askAgent(question) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    console.log("\nAI:");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error.message);
  }

  promptUser();
}

function promptUser() {
  rl.question("\nYou: ", (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    if (input.toLowerCase().startsWith("remember ")) {
      const memoryText = input.substring(9);

      saveMemory(memoryText);

      console.log("\nMemory saved.");

      promptUser();
      return;
    }

    if (input.toLowerCase() === "show memories") {
      const memories = getMemories();

      console.log("\nMemories:");
      console.log(memories);

      promptUser();
      return;
    }

if (input.toLowerCase().includes("favorite guitar")) {

  const results = searchMemories("guitar");

  if (results.length > 0) {

    console.log("\nAI:");
    console.log(results[0].text);

  } else {

    console.log("\nAI:");
    console.log("I do not know your favorite guitar yet.");

  }

  promptUser();
  return;
}

    askAgent(input);
  });
}

console.log("AI Agent Started");
promptUser();