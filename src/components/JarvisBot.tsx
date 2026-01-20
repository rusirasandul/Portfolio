import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

const JarvisBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Greetings. I am JARVIS. Accessing Mr. Sandul's portfolio protocols... How may I assist you?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    
    // 1. Add User Message immediately
    const userMsg: Message = { text: userMessage, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    
    // 2. Set "Thinking" state (Loading message)
    const loadingMsg: Message = { text: "Accessing database...", sender: 'bot', isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      // 3. Call your Node Backend
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // 4. Replace loading message with real AI reply
      setMessages(prev => [
        ...prev.filter(msg => !msg.isLoading), // Remove loading msg
        { text: data.reply, sender: 'bot' }
      ]);

    } catch (error) {
      console.error('JARVIS Connection Error:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.isLoading),
        { text: "Connection to server failed, sir. Please ensure the backend is running on port 5000.", sender: 'bot' }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 md:w-96 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 border-b border-cyan-500/30 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>
                <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase font-bold">J.A.R.V.I.S</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyan-600 hover:text-cyan-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-700/50' 
                      : 'bg-slate-800/80 text-gray-200 border-l-2 border-cyan-400'
                  }`}>
                    {msg.sender === 'bot' && (
                      <Cpu 
                        size={14} 
                        className={`text-cyan-400 mb-1 inline-block mr-2 ${msg.isLoading ? 'animate-pulse' : ''}`} 
                      />
                    )}
                    <span className={`whitespace-pre-line ${msg.isLoading ? 'text-cyan-400 italic' : ''}`}>
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-900 border-t border-cyan-500/30 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Command..."
                className="flex-1 bg-slate-800/50 text-cyan-100 placeholder-cyan-800 text-sm px-3 py-2 rounded border border-cyan-900/50 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                className="bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-400 p-2 rounded border border-cyan-700/50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Trigger Button (Arc Reactor Style) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-cyan-400 p-4 rounded-full shadow-[0_0_15px_cyan] border border-cyan-400/50 relative group"
      >
        {/* Arc Reactor Glow Effect */}
        <div className="absolute inset-0 rounded-full border border-cyan-400 opacity-50 animate-ping"></div>
        <div className="absolute inset-1 rounded-full border border-cyan-200 opacity-20"></div>
        
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default JarvisBot;
