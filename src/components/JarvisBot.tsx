import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

const JarvisBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Rusira's AI assistant. Ask me anything about his work, projects, skills, or experience.",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue;

    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setMessages((prev) => [
      ...prev,
      { text: 'Thinking…', sender: 'bot', isLoading: true },
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
      console.error('AI Assistant connection error:', error);
      setMessages((prev) => [
        ...prev.filter((m) => !m.isLoading),
        {
          text: 'Sorry, I couldn\u2019t reach the server right now. Please try again in a moment.',
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
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-ink-900/90 shadow-card backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-r from-accent/15 to-iris/10 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-iris text-white">
                  <Sparkles size={17} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">AI Assistant</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
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
                        : 'rounded-bl-md border border-white/[0.08] bg-white/[0.04] text-zinc-200'
                    }`}
                  >
                    <span
                      className={`whitespace-pre-line ${
                        msg.isLoading ? 'italic text-zinc-400' : ''
                      }`}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2 border-t border-white/[0.06] p-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
              />
              <button
                onClick={handleSend}
                className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white transition-all hover:bg-accent-dark"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Jarvis"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-iris text-white shadow-glow"
      >
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
        )}
        <span className="relative">
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </span>
      </motion.button>
    </div>
  );
};

export default JarvisBot;
