"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

type Message = {
  role: "user" | "bot";
  content: string;
};

type ChatHistory = {
  title: string;
  messages: Message[];
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<ChatHistory[]>([
    { title: "Headache Check", messages: [] },
    { title: "Fever Symptoms", messages: [] },
  ]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  function saveChat(newMessages: Message[]) {
    setHistory((prev: ChatHistory[]) => {
      const updated = [...prev];
      updated[activeIndex] = { ...updated[activeIndex], messages: newMessages };
      return updated;
    });
  }

  async function handleSend() {
    if (!input.trim()) return;
    const captured = input;
    setInput("");

    setMessages((prev: Message[]) => {
      const next: Message[] = [...prev, { role: "user", content: captured }];
      saveChat(next);
      return next;
    });

    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: captured }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev: Message[]) => {
          const botMsg: Message = { role: "bot", content: data.reply };
          const next: Message[] = [...prev, botMsg];
          saveChat(next);
          return next;
        });
      } else {
        setMessages((prev: Message[]) => {
          const botMsg: Message = {
            role: "bot",
            content: data.error || "Error: No response from server",
          };
          const next: Message[] = [...prev, botMsg];
          saveChat(next);
          return next;
        });
      }
    } catch (error) {
      setMessages((prev: Message[]) => {
        const botMsg: Message = {
          role: "bot",
          content: "Sorry, something went wrong while contacting the server.",
        };
        const next: Message[] = [...prev, botMsg];
        saveChat(next);
        return next;
      });
    } finally {
      setIsTyping(false);
    }
  }

  function resumeChatFromHistory(index: number) {
    setActiveIndex(index);
    setMessages(history[index].messages);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renameChat = (index: number) => {
    const newTitle = prompt("Enter new chat title:", history[index].title);
    if (newTitle && newTitle.trim() !== "") {
      setHistory((prev) => {
        const updated = [...prev];
        updated[index].title = newTitle;
        return updated;
      });
    }
    setMenuOpenIndex(null);
  };

  const deleteChat = (index: number) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      setHistory((prev) => prev.filter((_, i) => i !== index));
      if (activeIndex === index) {
        setActiveIndex(0);
        setMessages(history[0]?.messages || []);
      }
    }
    setMenuOpenIndex(null);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`flex h-screen w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Sidebar */}
      <aside
        className={`h-full flex flex-col border-r transition-all duration-300 ${
          sidebarOpen ? "w-64 border-border/40" : "w-16 border-border/20"
        } bg-background dark:bg-gray-800`}
      >
        <header className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5 p-3 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Icon icon="medical-icon:i-health-services" className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HealthBot AI
                </h2>
                <p className="text-xs text-muted-foreground">Symptom Checker</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-muted">
            <Icon icon="mdi:menu" className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          {sidebarOpen && (
            <button
              onClick={() => {
                const newTitle = "New Chat";
                const newChat: ChatHistory = { title: newTitle, messages: [] };
                setHistory((prev: ChatHistory[]) => [newChat, ...prev]);
                setActiveIndex(0);
                setMessages([]);
              }}
              className="mb-4 w-full rounded-md bg-primary/20 px-3 py-2 text-primary font-medium hover:bg-primary/30 transition"
            >
              + New Chat
            </button>
          )}
          {sidebarOpen && <p className="text-xs font-medium text-muted-foreground mb-2">Chat History</p>}
          <div className="space-y-1">
            {history.map((chat, idx) => (
              <div key={idx} className="relative flex items-center">
                <button
                  onClick={() => resumeChatFromHistory(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md w-full transition-colors ${
                    activeIndex === idx ? "bg-primary/20 text-primary font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <Icon icon="mdi:history" className="h-4 w-4" />
                  {sidebarOpen && <span>{chat.title}</span>}
                </button>
                {sidebarOpen && (
                  <div className="relative ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenIndex(menuOpenIndex === idx ? null : idx);
                      }}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Icon icon="mdi:dots-vertical" className="h-4 w-4" />
                    </button>
                    {menuOpenIndex === idx && (
                      <div className="absolute right-0 mt-1 w-28 bg-background dark:bg-gray-800 border border-border/40 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => renameChat(idx)}
                          className="w-full px-3 py-2 text-left hover:bg-muted/50 dark:hover:bg-gray-700"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => deleteChat(idx)}
                          className="w-full px-3 py-2 text-left hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {sidebarOpen && (
          <footer className="border-t border-border/40 p-4">
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3">
              <Icon icon="mdi:alert-circle" className="h-4 w-4 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800">
                AI suggestions are not medical advice. Always consult a healthcare professional.
              </p>
            </div>
          </footer>
        )}
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur px-6 dark:bg-gray-900/95">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Health Assistant</h1>
              <p className="text-xs text-muted-foreground">Online • Ready to help</p>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md hover:bg-muted">
            <Icon icon={darkMode ? "mdi:weather-sunny" : "mdi:weather-night"} className="h-5 w-5" />
          </button>
        </header>

        <div
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-3 max-w-2xl">
                {msg.role === "bot" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`border rounded-lg shadow-sm px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-100"
                      : "bg-background text-black"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Icon icon="mdi:account" className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 max-w-2xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Icon icon="mdi:robot" className="h-4 w-4 text-white" />
                </div>
                <div className="border rounded-lg shadow-sm px-4 py-3 bg-gray-700 text-gray-100">
                  <p className="text-sm leading-relaxed">Typing...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border/40 bg-background/50 backdrop-blur p-4 dark:bg-gray-900/50">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Describe your symptoms in detail..."
                className={`w-full min-h-[60px] max-h-32 resize-none border rounded-md px-3 py-2 pr-12
                            ${darkMode
                              ? "bg-gray-700 text-gray-100"
                              : "bg-background/80 text-black"}
                            backdrop-blur focus:border-primary/60`}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50"
                type="button"
              >
                <Icon icon="mdi:send" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
