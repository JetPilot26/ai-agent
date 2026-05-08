import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";

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

    askAgent(input);

  });

}

console.log("AI Agent Started");
promptUser();