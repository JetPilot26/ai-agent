import dotenv from "dotenv";
import readline from "readline";
import { routeInput } from "./src/agent/router.js";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isRunning = true;

async function promptUser() {
  if (!isRunning) {
    return;
  }

  rl.question("\nYou: ", async input => {
    try {
      const result = await routeInput(input);

      if (result?.response) {
        console.log("\nAI:");
        console.log(result.response);
      }

      if (result?.shouldExit) {
        isRunning = false;
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

rl.on("SIGINT", () => {
  console.log("\nGoodbye.");
  isRunning = false;
  rl.close();
});

rl.on("close", () => {
  isRunning = false;
});

console.log("AI Agent Started");
promptUser();