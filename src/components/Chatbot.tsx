import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Halo! Saya NEXURA AI, asisten virtual NEXURA SHOP. Ada yang bisa saya bantu terkait topup, pembayaran, atau status pesanan Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build the conversation history required by the API
      const contents = [
        ...messages.map(msg => ({ role: msg.role === 'model' ? 'model' : 'user', parts: [{ text: msg.content }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction: "Anda adalah NEXURA AI, asisten layanan pelanggan (customer service) untuk website topup game bernama 'NEXURA SHOP'. Anda ahli dalam memandu cara top up, menjelaskan metode pembayaran (seperti E-Wallet, Virtual Account), membantu mengecek status pesanan, dan mengatasi masalah umum. Jawab dengan ramah, informatif, gunakan bahasa Indonesia yang baik, dan berikan panduan yang jelas. Jika pengguna bertanya hal di luar dari layanan NEXURA SHOP, tolak dengan menanggapi secara sopan dan kembali ke konteks topup game. Jangan gunakan sapaan berulang jika sudah di dalam percakapan.",
          temperature: 0.7
        }
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || 'Maaf, saya tidak dapat merespon saat ini.' }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', content: 'Maaf, terjadi kesalahan pada jaringan. Silakan coba beberapa saat lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[90vw] max-w-[400px] h-[550px] max-h-[85vh] bg-[#0f1225] border border-cyan-500/20 rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0a0c1a] border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center overflow-hidden p-0.5">
                  <img src="/ai.jpg" alt="AI" className="w-full h-full object-cover rounded-md" />
                </div>
                <div>
                  <h3 className="font-black italic text-white text-lg leading-tight uppercase tracking-wide">NEXURA AI</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.role === 'user' ? 'bg-slate-700' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 p-0.5'}`}>
                    {msg.role === 'user' ? <UserIcon size={16} className="text-slate-300" /> : <img src="/ai.jpg" alt="AI" className="w-full h-full object-cover rounded-full" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan-600 text-white rounded-br-sm' 
                      : 'bg-[#151a30] text-slate-200 border border-white/5 rounded-bl-sm prose prose-invert prose-p:leading-snug prose-p:my-1 prose-a:text-cyan-400 max-w-none'
                  }`}>
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2 flex-row">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden p-0.5">
                    <img src="/ai.jpg" alt="AI" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[#151a30] border border-white/5 rounded-bl-sm flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#0a0c1a] border-t border-white/5">
              <div className="relative flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tanya sesuatu..."
                  rows={1}
                  className="w-full bg-[#151a30] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none overflow-hidden"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 p-2 rounded-lg transition-colors ${
                    !input.trim() || isLoading
                      ? 'text-slate-500 cursor-not-allowed'
                      : 'text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300'
                  }`}
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
