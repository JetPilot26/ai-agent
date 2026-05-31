import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing OPENAI_API_KEY in environment variables."
  );
}

const client = new OpenAI({
  apiKey,
  timeout: 30_000
});

const DEFAULT_MODEL =
  process.env.OPENAI_MODEL || "gpt-4.1-mini";

export async function askAI(question, conversationHistory = []) {
  if (
    typeof question !== "string" ||
    question.trim() === ""
  ) {
    return "Please ask a valid question.";
  }

  if (question.trim().length > 4000) {
    return "That question is too long. Please shorten it.";
  }

  try {
    const response =
      await client.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant. Be concise, clear, and practical."
          },
          ...conversationHistory,
          {
            role: "user",
            content: question.trim()
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

    const answer =
      response?.choices?.[0]?.message?.content;

    if (!answer) {
      return "I received an empty response from the AI service.";
    }

    return answer;
  } catch (error) {
    console.error(
      "OpenAI request failed:",
      error.message
    );

    return "I had trouble contacting the AI service. Please try again.";
  }
}