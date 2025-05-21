// This is a simple mock AI service for demo purposes
// In a real app, you would connect this to an actual AI API like OpenAI

import { on } from "events";

export const getAIResponse = async (
  question: string,
  onChuck: (value: string) => void
) => {
  console.log(question);
  if (!question) {
    throw new Error("Question is required");
  }

  try {
    const reader = await fetch(`${import.meta.env.VITE_API_HOST}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript: question }),
    });

    const res = reader.body.getReader();
    const decoder = new TextDecoder("utf-8");
    // let result = "";

    while (true) {
      const { done, value } = await res.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // result += chunk;
      onChuck(chunk);
      console.log(chunk); // <-- Handle streamed chunk here
    }
    // return result;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response");
  }
};
