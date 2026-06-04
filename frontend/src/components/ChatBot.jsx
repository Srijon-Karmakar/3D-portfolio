import { useState, useRef, useEffect, useCallback } from "react";
import { sendPortfolioChatMessage } from "../lib/supabaseChat";
import { getRuleBasedReply } from "../utils/ruleEngine.js";
import "./ChatBot.css";

const WELCOME =
  "Hey! I'm Srijon's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch.";

const SUGGESTIONS = [
  "What's Srijon's tech stack?",
  "Tell me about his experience",
  "Show me his projects",
  "How can I hire him?",
];

function TypingIndicator() {
  return (
    <div className="cb-msg cb-msg--ai">
      <div className="cb-typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Message({ role, text, source }) {
  return (
    <div className={`cb-msg cb-msg--${role}`}>
      <p>{text}</p>
      {role === "ai" && source === "rules" && (
        <span className="cb-source-badge">quick answer</span>
      )}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setShowSuggestions(false);
      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInput("");
      setLoading(true);

      const history = messages
        .filter((m) => m.text !== WELCOME)
        .slice(-6)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          text: m.text,
        }));

      try {
        const data = await sendPortfolioChatMessage(trimmed, history);
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.reply, source: data.source },
        ]);
      } catch {
        const reply = getRuleBasedReply(trimmed);
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: reply, source: "rules" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <div
        className={`cb-window${open ? " cb-window--open" : ""}`}
        role="dialog"
        aria-label="Chat with Srijon's AI"
      >
        <div className="cb-header">
          <div className="cb-header-info">
            <span className="cb-header-avatar" aria-hidden="true" />
            <div>
              <p className="cb-header-name">Srijon's AI</p>
              <p className="cb-header-sub">Usually replies instantly</p>
            </div>
          </div>
          <button
            className="cb-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cb-messages">
          {messages.map((m, i) => (
            <Message key={i} role={m.role} text={m.text} source={m.source} />
          ))}

          {showSuggestions && !loading && (
            <div className="cb-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="cb-suggestion"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <div className="cb-input-wrap">
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={500}
            disabled={loading}
          />
          <button
            className="cb-send"
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9l20-7Z" />
            </svg>
          </button>
        </div>
      </div>

      <button
        className={`cb-trigger${open ? " cb-trigger--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Srijon's AI"}
      >
        <svg
          className="cb-trigger-icon cb-trigger-icon--chat"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="cb-trigger-label">Ask AI</span>
        <svg
          className="cb-trigger-icon cb-trigger-icon--close"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </>
  );
}
