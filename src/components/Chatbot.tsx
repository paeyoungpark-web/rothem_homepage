import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: '안녕하세요! rothemsystem의 AI 챗봇입니다. 정보보호 경영시스템(ISO 27001), 개인정보보호(ISO 27701), 인공지능 경영시스템(ISO/IEC 42001), 자동차 정보보안(TISAX) 등 관련 컨설팅에 대해 무엇이든 편하게 물어보세요.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build brief system instructions for context. 
      const context = `
      You are the official AI Chatbot for "rothemsystem".
      Your role is to assist website visitors with polite, professional, and helpful answers in the language they speak (mostly Korean).
      
      Company Info:
      - Name: rothemsystem
      - Vision: AI 시대를 선도하는 정보보호 및 거버넌스 파트너. Trust, Security, Intelligence.
      - Core Services list (in priority order):
        1. 정보보호 경영시스템 (ISO 27001)
        2. 개인정보보호 경영시스템 (ISO 27701)
        3. 클라우드 보안 경영시스템 (ISO 27017)
        4. 인공지능 경영시스템 (ISO/IEC 42001)
        5. 자동차 정보보안 평가 (TISAX)
        6. 정보보호 및 개인정보 관리체계 (ISMS-P)
      - Additional Services: 취약점 진단 및 모의해킹, 시스템 통합 (SI), 보안 교육
      - CEO: 박배영 (Baeyoung Park)
      - Contact/Phone: 053-964-3033
      - Email: rothem@rothemsystem.com
      - Location: 대구시 동구 율하동로 23길

      Please give short, concise, and professional answers. Do not make up services that are not listed here.
      `;

      const history = messages.slice(-5).map(m => `[${m.role === 'user' ? 'Visitor' : 'rothemsystem AI'}]: ${m.content}`).join('\n');
      const prompt = `${context}\n\nChat History:\n${history}\n\n[Visitor]: ${userMessage.content}\n[rothemsystem AI]:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: text || '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: '죄송합니다. 지금은 응답할 수 없습니다. 나중에 다시 시도하거나 고객센터로 문의해주세요.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
        aria-label="로뎀시스템 AI 챗봇 열기"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-blue-600 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">rothemsystem AI 챗봇</h3>
                  <p className="text-xs text-blue-100">무엇이든 물어보세요!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 mt-1">
                      {msg.role === 'user' ? (
                        <User size={14} className="text-slate-600" />
                      ) : (
                        <Bot size={14} className="text-blue-600" />
                      )}
                    </div>
                    <div 
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm shadow-sm'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100">
                      <Bot size={14} className="text-blue-600" />
                    </div>
                    <div className="px-4 py-3 bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm">
                      <Loader2 size={16} className="animate-spin text-blue-600" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-blue-600 disabled:text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
