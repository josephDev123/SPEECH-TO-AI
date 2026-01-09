import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "tool";
  content: string;
}

export default function AiPlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hello! I'm your AI sandbox. You can type prompts, simulate tool calls, or run agent tests here.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    // Placeholder for AI / tool call simulation
    const mockReply: Message = {
      id: `${Date.now()}-reply`,
      role: "assistant",
      content: `🤖 (Simulated AI Response) — You said: "${input.trim()}"`,
    };

    setMessages((prev) => [...prev, newMessage, mockReply]);
    setInput("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 p-4 font-semibold text-lg text-gray-800">
          🧠 AI Playground
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : msg.role === "tool"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 text-sm rounded-2xl max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : msg.role === "tool"
                    ? "bg-amber-100 text-amber-800 font-medium"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <footer className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white">
          <input
            type="text"
            placeholder="Type your prompt, e.g. 'Summarize this text'..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
          >
            <SendHorizonal size={18} />
          </button>
        </footer>
      </div>
    </main>
  );
}
