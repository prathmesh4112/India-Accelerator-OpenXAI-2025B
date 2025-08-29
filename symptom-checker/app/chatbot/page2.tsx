"use client";
import { useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
};

export default function ChatbotPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Chat 1",
      messages: [
        {
          role: "bot",
          content:
            "Hello! Tell me your symptoms and I’ll suggest possible conditions. Remember: Always consult a doctor for proper advice.",
        },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<string>("1");
  const [input, setInput] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId);

  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    // add user message
    const newUserMessage: Message = { role: "user", content: input };

    const updatedChats = chats.map((c) =>
      c.id === activeChatId
        ? { ...c, messages: [...c.messages, newUserMessage] }
        : c
    );

    setChats(updatedChats);

    // bot response (dummy for now)
    const botResponse: Message = {
      role: "bot",
      content:
        "Thanks for sharing. Based on your input, it could be several conditions. Please monitor symptoms and consult a doctor.",
    };

    const updatedWithBot = updatedChats.map((c) =>
      c.id === activeChatId
        ? { ...c, messages: [...c.messages, botResponse] }
        : c
    );

    setChats(updatedWithBot);
    setInput("");
  };

  const newChat = () => {
    const newId = (chats.length + 1).toString();
    const chat: Chat = {
      id: newId,
      name: `Chat ${newId}`,
      messages: [
        {
          role: "bot",
          content:
            "Hello! Tell me your symptoms and I’ll suggest possible conditions.",
        },
      ],
    };
    setChats([...chats, chat]);
    setActiveChatId(newId);
  };

  return (
    <main className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-gray-700">
          Symptom Checker
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                chat.id === activeChatId ? "bg-gray-700" : ""
              }`}
            >
              {chat.name}
            </button>
          ))}
        </div>
        <button
          onClick={newChat}
          className="m-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Chat
        </button>
      </aside>

      {/* Chat area */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-700 py-4 px-6 text-xl font-semibold shadow">
          {activeChat?.name}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChat?.messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="border-t bg-gray-800 p-4 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your symptom..."
            className="flex-1 border rounded-xl px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
}
