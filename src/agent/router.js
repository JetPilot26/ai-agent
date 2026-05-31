import { askAI } from "../ai/openai.js";
import {
  saveMemory,
  getMemories,
  deleteMemories,
  updateMemory
} from "../memory/memory.js";

const UNSAFE_FORGET_WORDS = [
  "",
  "my",
  "the",
  "a",
  "an",
  "favorite",
  "memory",
  "memories",
  "everything",
  "all"
];

function isUnsafeQuery(query) {
  if (typeof query !== "string") {
    return true;
  }

  const cleanedQuery = query.trim().toLowerCase();

  return (
    cleanedQuery.length < 3 ||
    UNSAFE_FORGET_WORDS.includes(cleanedQuery)
  );
}

function cleanInput(input) {
  if (typeof input !== "string") {
    return "";
  }

  return input.trim();
}

export async function routeInput(input) {
  const userInput = cleanInput(input);

  if (!userInput) {
    return {
      shouldExit: false,
      response: "Please type something."
    };
  }

  const lowerInput = userInput.toLowerCase();

  if (lowerInput === "exit") {
    return {
      shouldExit: true,
      response: "Goodbye."
    };
  }

  if (lowerInput.startsWith("remember ")) {
    const memoryText = userInput.substring("remember".length).trim();

    if (!memoryText) {
      return {
        shouldExit: false,
        response:
          "Please tell me what to remember. Example: remember my favorite amp is the Spark 2"
      };
    }

    try {
      saveMemory(memoryText);

      return {
        shouldExit: false,
        response: "Memory saved."
      };
    } catch (error) {
      return {
        shouldExit: false,
        response: `I could not save that memory: ${error.message}`
      };
    }
  }

  if (lowerInput.startsWith("forget ")) {
    const query = userInput.substring("forget".length).trim();

    if (isUnsafeQuery(query)) {
      return {
        shouldExit: false,
        response:
          "Please be more specific about what to forget. Example: forget favorite amp"
      };
    }

    try {
      const deletedCount = deleteMemories(query);

      if (deletedCount === 0) {
        return {
          shouldExit: false,
          response: "I did not find any matching memories to forget."
        };
      }

      return {
        shouldExit: false,
        response: `Forgot ${deletedCount} matching memory item(s).`
      };
    } catch (error) {
      return {
        shouldExit: false,
        response: `I could not forget that memory: ${error.message}`
      };
    }
  }

  if (lowerInput.startsWith("update ")) {
    const updateText = userInput.substring("update".length).trim();

    if (!updateText) {
      return {
        shouldExit: false,
        response:
          "Please tell me what to update. Example: update my favorite amp to the Spark 2"
      };
    }

    if (!updateText.includes(" to ")) {
      return {
        shouldExit: false,
        response: "Use format: update my favorite amp to the Spark 2"
      };
    }

    const parts = updateText.split(" to ");

    if (parts.length < 2) {
      return {
        shouldExit: false,
        response: "Use format: update my favorite amp to the Spark 2"
      };
    }

    const query = parts[0].replace(/^my\s+/i, "").trim();
    const newValue = parts.slice(1).join(" to ").trim();

    if (isUnsafeQuery(query) || !newValue) {
      return {
        shouldExit: false,
        response: "Use format: update my favorite amp to the Spark 2"
      };
    }

    try {
      const updatedCount = updateMemory(
        query,
        `my ${query} is ${newValue}`
      );

      if (updatedCount === 0) {
        return {
          shouldExit: false,
          response: "I did not find a matching memory to update."
        };
      }

      return {
        shouldExit: false,
        response: `Updated ${updatedCount} matching memory item(s).`
      };
    } catch (error) {
      return {
        shouldExit: false,
        response: `I could not update that memory: ${error.message}`
      };
    }
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
      .filter(
        word =>
          word.length > 2 &&
          ![
            "my",
            "the",
            "is",
            "are",
            "do",
            "did",
            "what",
            "favorite"
          ].includes(word)
      );

    if (words.length === 0) {
      return {
        shouldExit: false,
        response: "Please be more specific about what memory you want me to look up."
      };
    }

    try {
      const memories = getMemories();

      const results = memories.filter(memory =>
        typeof memory.text === "string" &&
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
    } catch (error) {
      return {
        shouldExit: false,
        response: `I could not search memory: ${error.message}`
      };
    }
  }

  try {
    const aiResponse = await askAI(userInput);

    return {
      shouldExit: false,
      response: aiResponse
    };
  } catch (error) {
    return {
      shouldExit: false,
      response: `I had trouble contacting the AI service: ${error.message}`
    };
  }
}