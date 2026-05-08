import { askAI } from "../ai/openai.js";
import {
  saveMemory,
  getMemories,
  searchMemories,
  deleteMemories,
  updateMemory
} from "../memory/memory.js";

export async function routeInput(input) {
  const lowerInput = input.toLowerCase();

  if (lowerInput === "exit") {
    return {
      shouldExit: true,
      response: "Goodbye."
    };
  }

  if (lowerInput.startsWith("remember")) {
  const memoryText = input.substring(8).trim();

  if (!memoryText) {
    return {
      shouldExit: false,
      response: "Please tell me what to remember. Example: remember my favorite amp is the Spark 2"
    };
  }

  saveMemory(memoryText);

  return {
    shouldExit: false,
    response: "Memory saved."
  };
}

if (lowerInput.startsWith("forget")) {
  const query = input.substring(6).trim();

  const unsafeForgetWords = ["", "my", "the", "a", "an", "favorite", "memory", "memories"];

  if (unsafeForgetWords.includes(query.toLowerCase()) || query.length < 3) {
    return {
      shouldExit: false,
      response: "Please be more specific about what to forget. Example: forget favorite amp"
    };
  }

  const deletedCount = deleteMemories(query);

  return {
    shouldExit: false,
    response: `Forgot ${deletedCount} matching memory item(s).`
  };
}

if (lowerInput.startsWith("update")) {
  const updateText = input.substring(6).trim();

  if (!updateText) {
    return {
      shouldExit: false,
      response: "Please tell me what to update. Example: update my favorite amp to the Spark 2"
    };
  }

  if (updateText.includes(" to ")) {
    const parts = updateText.split(" to ");

    const query = parts[0]
      .replace("my ", "")
      .trim();

    const newValue = parts[1].trim();

    if (!query || !newValue) {
      return {
        shouldExit: false,
        response: "Use format: update my favorite amp to the Spark 2"
      };
    }

    updateMemory(
      query,
      `my ${query} is ${newValue}`
    );

    return {
      shouldExit: false,
      response: "Memory updated."
    };
  }

  return {
    shouldExit: false,
    response: "Use format: update my favorite amp to the Spark 2"
  };
}
  if (
  lowerInput.startsWith("what is my") ||
  lowerInput.startsWith("what's my") ||
  lowerInput.startsWith("what do i") ||
  lowerInput.startsWith("what did i") ||
  lowerInput.includes("do you remember")
) {
  const words = lowerInput
    .replace("what is my", "")
    .replace("what's my", "")
    .replace("what do i", "")
    .replace("what did i", "")
    .replace("do you remember", "")
    .replace("?", "")
    .trim()
    .split(" ")
.filter(word =>
  word.length > 2 &&
  !["my", "the", "is", "are", "do", "did", "what", "favorite"].includes(word)
);

  const memories = getMemories();

  const results = memories.filter(memory =>
    words.some(word =>
      memory.text.toLowerCase().includes(word)
    )
  );

  if (results.length > 0) {
    return {
      shouldExit: false,
      response: `I found this in memory: ${results[0].text}`
    };
  }

  return {
    shouldExit: false,
    response: "I do not have a memory about that yet."
  };
}

  const aiResponse = await askAI(input);

  return {
    shouldExit: false,
    response: aiResponse
  };
}