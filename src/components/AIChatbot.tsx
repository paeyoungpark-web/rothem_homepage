import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: '안녕하세요! 로뎀시스템 공식 AI 어시스턴트입니다. 정보보안, ISO 27001 컨설팅 등 궁금한 점을 물어보세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to store the chat instance so history is maintained naturally if we want,
  // but since we are recreating history or manually passing it, we can just use generateContent.
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      if (!process.env.GEMINI_API_KEY) {
         throw new Error("API Key missing");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `당신은 '로뎀시스템(rothemsystem)'의 공식 AI 어시스턴트입니다.
로뎀시스템의 대표이사 박배영은 AI 보안전문가 및 제4차 산업혁명 시대의 정보보호/인공지능 경영시스템(ISO/IEC 42001, ISO 27001 등) 선임심사원입니다.
스마트공장 점검/평가/자문 300여 건 이상, ISO 심사 250여 건 이상의 압도적 경험을 바탕으로 2010년부터 고객의 디지털 전환과 보안 컴플라이언스 체계 수립을 돕고 있습니다.
회원사는 정보보호 컨설팅과 보안 솔루션 제공, CISO 자문 등의 역할을 수행하는 최고의 전문가 그룹입니다.
어조: 전문적이고 신뢰감을 주며, 매우 친절하게 답변합니다. 답변은 한국어로 명확하고 간결하게 하되 핵심 정보를 포함합니다. 질문과 관련하여 로뎀시스템의 서비스를 안내하세요.`;

      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite-preview",
        config: { systemInstruction }
      });
      
      // Load history
      for (const msg of messages) {
        // Just updating the local history for context is not supported out of the box like this 
        // without accessing the internal history array.
        // As a simpler approach, we'll use generateContent with conversational structure.
      }
      
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents,
        config: { systemInstruction }
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'model', content: response.text }]);
      } else {
        throw new Error("No response from AI");
      }
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: '죄송합니다. 현재 응답 시스템에 일시적인 오류가 있습니다. 카카오톡 혹은 전화 문의를 이용해 주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold text-sm">로뎀시스템 AI 어시스턴트</h3>
                  <p className="text-xs text-blue-100">무엇이든 물어보세요</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-100 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot size={16} className="text-blue-600" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm \${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                     <Bot size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span className="text-xs text-slate-500 font-medium">분석 중...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} className="translate-y-[1px] -translate-x-[1px]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
