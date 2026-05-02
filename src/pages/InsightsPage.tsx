import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Calendar, ChevronRight, ShieldAlert, Trash2, Edit, Plus, X, Save, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GoogleGenAI } from '@google/genai';

interface InsightPost {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  createdAt?: any;
}

export default function InsightsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPost, setEditingPost] = useState<InsightPost | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      setIsAdmin(user?.email ? adminEmails.includes(user.email) : false);
    });

    const q = query(collection(db, 'insights'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const results: InsightPost[] = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as InsightPost);
      });
      setPosts(results);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if(!isAdmin) return;
    if(!confirm(lang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this insight?')) return;
    try {
      await deleteDoc(doc(db, 'insights', id));
    } catch(err) {
      console.error(err);
      alert('Failed to delete.');
    }
  };

  const handleUpdate = async () => {
    if(!editingPost || !isAdmin) return;
    try {
      await updateDoc(doc(db, 'insights', editingPost.id), {
        title: editingPost.title,
        content: editingPost.content,
        category: editingPost.category,
        updatedAt: serverTimestamp()
      });
      setEditingPost(null);
    } catch(err) {
      console.error(err);
      alert('Failed to update.');
    }
  };

  const manualGenerate = async () => {
    if(!isAdmin) return;
    if(!process.env.GEMINI_API_KEY) {
      alert("GEMINI_API_KEY is not set.");
      return;
    }
    
    setGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = lang === 'ko' 
        ? "정보보안 전문 회사 로뎀시스템의 '일일 보안 인사이트' 게시물 1건을 작성해주세요. 최신 사이버 보안 위협이나 AI 보안 트렌드에 대해 500자 내외로 전문가적이면서도 가독성이 높게 작성하고 JSON 형식으로 응답해주세요 (백틱 없는 순수 JSON): {\"title\": \"제목\", \"content\": \"본문 전체 내용\", \"category\": \"위협 동향 등\"}"
        : "Write a 500-word 'Daily Security Insight' post for an infosec consulting firm 'rothemsystem'. It should be about recent cyber threats or AI security trends. Respond ONLY in valid JSON format: {\"title\": \"post title\", \"content\": \"detailed post content\", \"category\": \"Threat Intel\"}.";
      
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
           await addDoc(collection(db, 'insights'), {
             title: parsed.title || '오늘의 보안 동향',
             content: parsed.content || '',
             category: parsed.category || 'Security',
             date: new Date().toISOString().split('T')[0],
             createdAt: serverTimestamp()
           });
         }
      }
    } catch (error) {
      console.error("Failed to generate insight:", error);
      alert('Generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 flex-grow max-w-7xl mx-auto w-full relative">
        <div className="mb-12 text-center relative">
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

          {isAdmin && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={manualGenerate}
              disabled={generating}
              className="absolute right-0 top-0 mt-2 bgGradient from-blue-600 to-indigo-600 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center gap-2"
            >
               {generating ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               ) : (
                 <Zap size={18} />
               )}
               {generating 
                 ? (lang === 'ko' ? '생성 중...' : 'Generating...') 
                 : (lang === 'ko' ? '인사이트 수동 생성' : 'Generate Insight')}
            </motion.button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse">
               {lang === 'ko' ? '불러오는 중...' : 'Loading...'}
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <ShieldAlert size={28} className="text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium text-lg">
               {lang === 'ko' ? '등록된 인사이츠가 없습니다.' : 'No insights available.'}
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
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative group"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingPost(post)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <ShieldAlert size={14} />
                    {post.category}
                  </span>
                  <span className="text-sm font-medium text-slate-400 flex items-center gap-1 pr-14 group-hover:pr-0 transition-all">
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

      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl"
            >
              <button onClick={() => setEditingPost(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                {lang === 'ko' ? '인사이트 수정' : 'Edit Insight'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <input type="text" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                  <input type="text" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                  <textarea rows={8} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <button onClick={() => setEditingPost(null)} className="px-6 py-2.5 font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                    {lang === 'ko' ? '취소' : 'Cancel'}
                  </button>
                  <button onClick={handleUpdate} className="px-6 py-2.5 font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-2">
                    <Save size={18} />
                    {lang === 'ko' ? '저장' : 'Save'}
                  </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
