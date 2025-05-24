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

    // Handle non-2xx responses immediately
    if (!reader.ok) {
      const errorText = await reader.text();
      console.log("json error", errorText);

      try {
        const json = JSON.parse(errorText);
        if (json !== null && typeof json === "object" && !Array.isArray(json)) {
          throw new Error(json.message);
        }
        throw new Error(`Server error: ${errorText}`);
      } catch {
        throw new Error(`Server responded with ${reader.status}: ${errorText}`);
      }
    }

    const res = reader.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await res.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      onChuck(chunk);
      // console.log(chunk);
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error(error.message || "Failed to fetch AI response");
  }
};
