
// This is a simple mock AI service for demo purposes
// In a real app, you would connect this to an actual AI API like OpenAI

export const getAIResponse = async (question: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demo purposes, providing canned responses based on keywords
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes("weather")) {
    return "The weather today is sunny with a high of 75°F.";
  } else if (questionLower.includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  } else if (questionLower.includes("name")) {
    return "I'm an AI assistant integrated with your Talk to Type application.";
  } else if (questionLower.includes("help")) {
    return "I can answer questions about various topics. Just speak clearly and I'll do my best to respond.";
  } else if (questionLower.includes("hello") || questionLower.includes("hi")) {
    return "Hello! How can I assist you today?";
  } else {
    return "I understand your question. In a complete implementation, I would connect to a real AI API to provide accurate answers to your queries.";
  }
};
