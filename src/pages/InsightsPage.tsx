import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Bookmark, Calendar, ChevronRight, ShieldAlert, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InsightPost {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export default function InsightsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [lang]);

  const loadPosts = async () => {
    setLoading(true);
    let savedPosts: InsightPost[] = [];
    try {
      const saved = localStorage.getItem(`rothem_insights_${lang}`);
      if (saved) savedPosts = JSON.parse(saved);
    } catch(e) {}

    const todayStr = new Date().toISOString().split('T')[0];
    const hasTodayPost = savedPosts.some(p => p.date === todayStr);

    if (!hasTodayPost) {
      if (process.env.GEMINI_API_KEY) {
        setGenerating(true);
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const prompt = lang === 'ko' 
            ? "정보보안 전문 회사 로뎀시스템의 '일일 보안 인사이트' 게시물 1건을 작성해주세요. 최근 사이버 보안 위협이나 AI 보안 트렌드에 대해 3~4문단으로 작성하고 JSON 형식으로 응답해주세요: {\"title\": \"제목\", \"content\": \"내용 요약\", \"category\": \"위협 동향 등\"}. 포맷 변수명은 반드시 지켜주세요."
            : "Write a short 'Daily Security Insight' post for an infosec consulting firm 'rothemsystem'. It should be about recent cyber threats or AI security trends. Write 3-4 paragraphs. Respond ONLY in valid JSON format: {\"title\": \"post title\", \"content\": \"detailed post content\", \"category\": \"Threat Intel\"}.";
          
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });
          
          if (response.text) {
             const jsonMatch = response.text.match(/\{[\s\S]*\}/);
             if (jsonMatch) {
               const parsed = JSON.parse(jsonMatch[0]);
               const newPost: InsightPost = {
                 id: Date.now().toString(),
                 date: todayStr,
                 title: parsed.title || (lang === 'ko' ? '일일 보안 동향' : 'Daily Security Trend'),
                 content: parsed.content || '',
                 category: parsed.category || 'Security'
               };
               savedPosts = [newPost, ...savedPosts];
               localStorage.setItem(`rothem_insights_${lang}`, JSON.stringify(savedPosts));
             }
          }
        } catch (error) {
          console.error("Failed to generate insight:", error);
        } finally {
          setGenerating(false);
        }
      } else {
        // Fallback dummy for today if no API key
        if(savedPosts.length === 0) {
            const dummy: InsightPost = {
                id: Date.now().toString(),
                date: todayStr,
                title: lang === 'ko' ? '클라우드 보안 아키텍처의 중요성' : 'Importance of Cloud Security Architecture',
                content: lang === 'ko' ? '제로 트러스트 기반의 클라우드 인증 체계가 더욱 중요해지고 있습니다...' : 'Zero Trust based cloud authentication is becoming more critical...',
                category: 'Cloud Security'
            };
            savedPosts = [dummy];
        }
      }
    }

    setPosts(savedPosts);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 flex-grow max-w-7xl mx-auto w-full">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4"
          >
            {lang === 'ko' ? '보안 인사이츠' : 'Security Insights'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {lang === 'ko' 
              ? '로뎀시스템 AI가 매일 선별해 드리는 최신 정보보호 트렌드 분석입니다.' 
              : 'Daily information security trends and analysis curated by rothemsystem AI.'}
          </motion.p>
        </div>

        {loading || generating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse">
              {generating 
                ? (lang === 'ko' ? '오늘의 보안 소식을 생성하고 있습니다...' : "Generating today's security news...") 
                : (lang === 'ko' ? '불러오는 중...' : 'Loading...')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <ShieldAlert size={14} />
                    {post.category}
                  </span>
                  <span className="text-sm font-medium text-slate-400 flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-6 flex-grow whitespace-pre-wrap text-sm md:text-base opacity-80 line-clamp-4">
                  {post.content}
                </p>
                
                <div className="mt-auto">
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1">
                        {lang === 'ko' ? '자세히 보기' : 'Read more'} <ChevronRight size={16} />
                    </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
