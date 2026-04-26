import React, { useMemo, useRef, useState } from "react";
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jobService from "../services/jobService";

const QUICK_PROMPTS = [
  "Find a plumber near me",
  "How do I book a worker?",
  "What categories of workers are available?",
  "How can I verify a worker?",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FixMateSupportPage() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! Welcome to FixMate. I can help you find workers, book services, check availability, pricing, or guide you through the process.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  const chatPayload = useMemo(
    () =>
      messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    [messages]
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const addMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, content },
    ]);
    setTimeout(scrollToBottom, 0);
  };

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");

    const nextMessages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await jobService.chat(
        nextMessages.map(({ role, content }) => ({ role, content }))
      );

      const reply =
        res?.data?.reply ||
        "Sorry, I couldn’t process that request. Please try again.";

      addMessage("assistant", reply);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to connect. Please try again later."
      );
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Hi! Welcome to FixMate. I can help you find workers, book services, check availability, pricing, or guide you through the process.",
      },
    ]);
    setError("");
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                FixMate Support
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">
                Find trusted workers, explore services, and get help with bookings.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearChat}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Trash2 className="h-4 w-4" />
            Clear chat
          </button>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[320px_1fr]">
          
          {/* SIDEBAR */}
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <p className="mt-1 text-sm text-slate-600">
              Start quickly with common requests.
            </p>

            <div className="mt-4 space-y-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Need help?</p>
              <p className="mt-2">
                Ask anything about services, bookings, pricing, or worker availability.
              </p>
            </div>
          </aside>

          {/* MAIN CHAT */}
          <main className="flex min-h-[72vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            
            {/* CHAT HEADER */}
            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Support Chat</h2>
                  <p className="text-sm text-slate-500">
                    Get guidance to find the right worker or service.
                  </p>
                </div>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex items-end gap-3",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      {!isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                      )}

                      <div
                        className={cn(
                          "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[70%]",
                          isUser
                            ? "rounded-br-md bg-slate-900 text-white"
                            : "rounded-bl-md border border-slate-200 bg-slate-50 text-slate-800"
                        )}
                      >
                        {msg.content}
                      </div>

                      {isUser && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {loading && (
                <div className="flex items-end gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-3xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Finding the best option for you...
                    </span>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* ERROR */}
            {error && (
              <div className="mx-4 mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6">
                {error}
              </div>
            )}

            {/* INPUT */}
            <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  placeholder="Ask about services, booking, pricing, or workers..."
                  rows={2}
                  className="min-h-[56px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Press Enter to send, Shift+Enter for a new line.
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}