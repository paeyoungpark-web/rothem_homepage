import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    // Initial bot message
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'init',
          sender: 'bot',
          text: lang === 'ko' 
            ? '안녕하세요! 로뎀시스템 통합 보안 안내 챗봇입니다. 무엇을 도와드릴까요?' 
            : 'Hello! I am the rothemsystem unified security assistant. How can I help you today?'
        }
      ]);
    }
  }, [isOpen, lang, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMsg }]);
    
    if (!process.env.GEMINI_API_KEY) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          sender: 'bot', 
          text: lang === 'ko' 
            ? '죄송합니다. 현재 AI 챗봇 기능이 일시적으로 중단되었습니다.' 
            : 'Sorry, the AI chat service is currently unavailable.' 
        }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a professional customer support AI for 'rothemsystem', an information security consulting company in South Korea.
The user's language is \${lang}. The company's CEO is Paeyoung Park. 
The company specializes in ISO 27001, ISO 27701, ISO 42001, TISAX, ISMS-P. 
Reply concisely and professionally to the user's message.
User's message: \${userMsg}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'bot', 
        text: response.text || (lang === 'ko' ? '오류가 발생했습니다.' : 'An error occurred.')
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'bot', 
        text: lang === 'ko' ? '서비스 응답 지연 중입니다. 나중에 다시 시도해주세요.' : 'Service timeout. Please try again later.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all z-50 \${isOpen ? 'scale-0' : 'scale-100 hover:scale-110'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl shadow-slate-900/10 flex flex-col z-50 overflow-hidden border border-slate-200 flex-shrink-0"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center relative">
                    <Bot size={20} />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white mb-0.5">Rothem AI Support</h3>
                  <p className="text-blue-300 text-xs font-medium">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex \${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm flex gap-3 \${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'}`}>
                    <div className="break-words leading-relaxed whitespace-pre-wrap flex-1">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 text-slate-800 shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'ko' ? '메시지를 입력하세요...' : 'Type your message...'}
                  className="w-full bg-slate-100 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  disabled={isTyping}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 text-blue-600 hover:text-blue-800 disabled:text-slate-400 transition-colors"
                >
                  <Send size={18} className={!input.trim() || isTyping ? 'opacity-50' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
