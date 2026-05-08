import dotenv from "dotenv";
import readline from "readline";
import { routeInput } from "./src/agent/router.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptUser() {
  rl.question("\nYou: ", async (input) => {
    try {
      const result = await routeInput(input);

      if (result.response) {
        console.log("\nAI:");
        console.log(result.response);
      }

      if (result.shouldExit) {
        rl.close();
        return;
      }

      promptUser();
    } catch (error) {
      console.error("Error:", error.message);
      promptUser();
    }
  });
}

console.log("AI Agent Started");
promptUser();