import { askAI } from "../ai/openai.js";
import {
  saveMemory,
  getMemories,
  searchMemories
} from "../memory/memory.js";

export async function routeInput(input) {
  const lowerInput = input.toLowerCase();

  if (lowerInput === "exit") {
    return {
      shouldExit: true,
      response: "Goodbye."
    };
  }

  if (lowerInput.startsWith("remember ")) {
    const memoryText = input.substring(9);

    saveMemory(memoryText);

    return {
      shouldExit: false,
      response: "Memory saved."
    };
  }

  if (lowerInput === "show memories") {
    const memories = getMemories();

    return {
      shouldExit: false,
      response: JSON.stringify(memories, null, 2)
    };
  }

  if (lowerInput.includes("favorite guitar")) {
    const results = searchMemories("guitar");

    if (results.length > 0) {
      return {
        shouldExit: false,
        response: results[0].text
      };
    }

    return {
      shouldExit: false,
      response: "I do not know your favorite guitar yet."
    };
  }

  const aiResponse = await askAI(input);

  return {
    shouldExit: false,
    response: aiResponse
  };
}