import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

const GREETING =
  "Hi! \uD83D\uDC4B I'm JARVIS, Rusira's AI assistant. Ask me anything about his work, projects, skills, or experience.";

const JarvisBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: GREETING, sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Proactively pop a greeting bubble to grab attention
  useEffect(() => {
    if (isOpen || bubbleDismissed) return;
    const show = setTimeout(() => setShowBubble(true), 2500);
    const hide = setTimeout(() => setShowBubble(false), 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [isOpen, bubbleDismissed]);

  const openChat = () => {
    setIsOpen(true);
    setShowBubble(false);
    setBubbleDismissed(true);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue;

    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setMessages((prev) => [
      ...prev,
      { text: 'Accessing database\u2026', sender: 'bot', isLoading: true },
    ]);

    try {
      const response = await fetch('https://portfolio-ffqi.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev.filter((m) => !m.isLoading),
        { text: data.reply, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('JARVIS connection error:', error);
      setMessages((prev) => [
        ...prev.filter((m) => !m.isLoading),
        {
          text: 'Apologies, sir \u2014 I couldn\u2019t reach the server. Please try again in a moment.',
          sender: 'bot',
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
            className="glass mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl bg-ink-900/70"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-gradient-to-r from-accent/20 to-iris/10 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-iris text-white shadow-glow-sm">
                  <Sparkles size={17} />
                </span>
                <div>
                  <div className="font-display text-sm font-semibold tracking-wide text-white">
                    J.A.R.V.I.S
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Rusira&apos;s AI Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close assistant chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-br-md bg-accent text-white'
                        : 'rounded-bl-md border border-white/[0.08] bg-white/[0.05] text-zinc-200'
                    }`}
                  >
                    <span
                      className={`whitespace-pre-line ${
                        msg.isLoading ? 'italic text-accent-light' : ''
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 border-t border-white/[0.08] p-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="glass-input flex-1 !py-2.5 text-sm"
              />
              <button
                onClick={handleSend}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white transition-all hover:bg-accent-dark hover:shadow-glow-sm"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proactive greeting bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.button
            onClick={openChat}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            className="glass absolute bottom-1 right-16 w-[min(15rem,calc(100vw-6rem))] rounded-2xl rounded-br-md bg-ink-900/70 p-3.5 text-left"
          >
            <div className="flex items-start gap-2">
              <motion.span
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block origin-[70%_70%] text-lg leading-none"
              >
                {'\uD83D\uDC4B'}
              </motion.span>
              <p className="text-xs leading-relaxed text-zinc-200">
                Hi, I&apos;m <span className="font-semibold text-accent-light">JARVIS</span> — Rusira&apos;s
                AI assistant. Tap to chat!
              </p>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
                setBubbleDismissed(true);
              }}
              className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-ink-850 text-zinc-400 transition-colors hover:text-white"
              aria-label="Dismiss greeting"
            >
              <X size={11} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating trigger with wave rings */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        aria-label="Toggle Jarvis"
        className="jarvis-fab relative grid h-14 w-14 place-items-center overflow-visible rounded-full text-white"
      >
        {!isOpen && (
          <>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/50" />
            <span className="anim-delay-600 absolute inset-0 -z-10 animate-ping rounded-full bg-accent/30" />
            <span className="anim-delay-1200 absolute inset-0 -z-10 animate-ping rounded-full bg-accent/20" />
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default JarvisBot;
