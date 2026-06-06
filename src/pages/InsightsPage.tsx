import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Calendar, ChevronRight, ShieldAlert, Trash2, Edit, Plus, X, Save, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { GoogleGenAI } from '@google/genai';

interface InsightPost {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status?: string;
  createdBy?: string;
  createdAt?: any;
}

function getCleanSnippet(content: string): string {
  if (!content) return '';
  // Strip markdown tags and headings for a clean card abstract summary
  const clean = content
    .replace(/##\s*[^\n]+/g, '')
    .replace(/[\*\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || content;
}

function renderFormattedContent(content: string) {
  if (!content) return null;
  
  if (!content.includes('## 📌') && !content.includes('## 🔍') && !content.includes('## 💡')) {
    return <p className="text-slate-700 whitespace-pre-wrap text-base leading-relaxed">{content}</p>;
  }

  const parts = content.split(/##\s+/);
  
  return (
    <div className="space-y-6">
      {parts.map((part, index) => {
        const trimmed = part.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('📌 핵심 요약') || trimmed.startsWith('Summary')) {
          const lines = trimmed.split('\n');
          const heading = lines[0];
          const bullets = lines.slice(1)
            .map(l => l.trim())
            .filter(l => l.startsWith('*') || l.startsWith('-'))
            .map(l => l.replace(/^[\*\-]\s*/, ''));

          return (
            <div key={index} className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 rounded-2xl p-5 md:p-6 shadow-sm">
              <h4 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                <span className="text-lg">📌</span> {heading.replace(/📌\s*/, '')}
              </h4>
              <ul className="space-y-2.5">
                {bullets.map((bullet, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2.5 text-slate-700 text-sm md:text-[15px] leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (trimmed.startsWith('🔍 무슨 일인가요?') || trimmed.startsWith('What Happened?')) {
          const lines = trimmed.split('\n');
          const heading = lines[0];
          const body = lines.slice(1).join('\n').trim();

          return (
            <div key={index} className="space-y-3">
              <h4 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="text-lg">🔍</span> {heading.replace(/🔍\s*/, '')}
              </h4>
              <div className="text-slate-600 text-sm md:text-[15px] leading-relaxed space-y-3 whitespace-pre-wrap">
                {body}
              </div>
            </div>
          );
        }

        if (trimmed.startsWith('💡 로템\'s 한줄평 / 시사점') || trimmed.startsWith('💡 로템’s 한줄평 / 시사점') || trimmed.startsWith('💡 로뎀\'s 한줄평 / 시사점') || trimmed.startsWith('💡 로뎀’s 한줄평 / 시사점') || trimmed.startsWith('💡 Rothem\'s Take / Security Impact') || trimmed.startsWith('💡 Rodem\'s Take / Security Impact')) {
          const lines = trimmed.split('\n');
          const heading = lines[0];
          const body = lines.slice(1).join('\n').trim();

          return (
            <div key={index} className="bg-gradient-to-br from-amber-50 to-amber-100/30 border border-amber-100 rounded-2xl p-5 md:p-6 relative overflow-hidden">
              <h4 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 mb-2 relative z-10">
                <span className="text-lg">💡</span> {heading.replace(/💡\s*/, '')}
              </h4>
              <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold relative z-10">
                {body}
              </p>
            </div>
          );
        }

        // Default or unformatted block
        return (
          <div key={index} className="text-slate-600 text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap">
            {trimmed}
          </div>
        );
      })}
    </div>
  );
}

export default function InsightsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPost, setEditingPost] = useState<InsightPost | null>(null);
  const [generating, setGenerating] = useState(false);
  const [viewingPost, setViewingPost] = useState<InsightPost | null>(null);

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
      try {
        handleFirestoreError(err, OperationType.GET, 'insights');
      } catch (specErr) {
        console.error("Caught spec error safely in InsightsPage snapshots:", specErr);
      }
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
      handleFirestoreError(err, OperationType.DELETE, `insights/${id}`);
    }
  };

  const handleUpdate = async () => {
    if(!editingPost || !isAdmin) return;
    try {
      await updateDoc(doc(db, 'insights', editingPost.id), {
        title: editingPost.title,
        content: editingPost.content,
        category: editingPost.category,
        status: editingPost.status || 'published',
        updatedAt: serverTimestamp()
      });
      setEditingPost(null);
    } catch(err) {
      console.error(err);
      handleFirestoreError(err, OperationType.UPDATE, `insights/${editingPost.id}`);
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
        ? `당신은 IT, 정보보안, 인공지능(AI) 분야의 최신 트렌드를 신속하고 정확하게 전달하는 '로뎀시스템(Rothem System)'의 전문 테크 에디터입니다.
바쁜 직장인과 IT 관리자들이 출근길이나 자투리 시간에 1분 만에 핵심을 파악할 수 있는 '빠른 소식' 형태의 글을 한국어로 작성해 주세요.

[글쓰기 원칙 (Style Guide)]
1. 톤앤매너: 전문적이면서도 딱딱하지 않은, 친절하고 명쾌한 구어체(~체, ~습니다)를 사용해라.
2. 가독성: 복잡한 기술 용어는 쉽게 풀어서 설명하고, 줄바꿈과 이모지(Emoji)를 적절히 활용하여 시각적 피로감을 줄여라.
3. 신뢰성: 자극적인 과장이나 왜곡 없이, 팩트 기반으로 요약해라.

반드시 아래 JSON 형식으로 응답해 주세요 (백틱 없이 순수한 JSON 객체만 반환):
{
  "title": "[시선과 이목을 끄는 명확한 한 줄 제목 (이모지 포함)]",
  "content": "## 📌 핵심 요약\\n* [핵심 요약 포인트 1]\\n* [핵심 요약 포인트 2]\\n* [핵심 요약 포인트 3]\\n\\n## 🔍 무슨 일인가요?\\n[사건의 배경이나 기술의 핵심 내용을 2~3문단으로 쉽게 설명, 문단 간 긴 줄바꿈 포함]\\n\\n## 💡 로뎀's 한줄평 / 시사점\\n[이 이슈가 기업이나 보안 관리자, 또는 대중에게 어떤 영향을 미치는지, 어떤 대응이 필요한지 전문가 관점의 코멘트를 1~2줄로 구성]",
  "category": "예: 위협 동향, AI 보안, 클라우드 보안, 인증 가이드 등 적절한 카테고리 하나"
}`
        : `You are a professional tech editor for "Rothem System". Write a 300-word daily security insights post about recent cyber threats or AI security trends. Highlight 3 bullet-point summaries and an expert comment. 
Respond ONLY in valid JSON format:
{
  "title": "[Catchy title with emojis]",
  "content": "## 📌 Summary\\n* [Point 1]\\n* [Point 2]\\n* [Point 3]\\n\\n## 🔍 What Happened?\\n[Details in 2 paragraphs]\\n\\n## 💡 Rothem's Take / Security Impact\\n[Expert response comment of 1-2 lines]",
  "category": "Threat Intel"
}`;
      
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
             status: 'published',
             createdBy: 'admin-auto',
             date: new Date().toISOString().split('T')[0],
             createdAt: serverTimestamp()
           });
         }
      }
    } catch (error) {
      console.error("Failed to generate insight:", error);
      handleFirestoreError(error, OperationType.CREATE, 'insights');
    } finally {
      setGenerating(false);
    }
  };

  // Filter posts to show published ones (or legacy documents without status) to general users,
  // and all status types to admin users.
  const displayedPosts = posts.filter(post => {
    if (isAdmin) return true;
    return !post.status || post.status === 'published';
  });

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
        ) : displayedPosts.length === 0 ? (
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
            {displayedPosts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative group"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => setEditingPost(post)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 mt-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      <ShieldAlert size={14} />
                      {post.category}
                    </span>
                    {isAdmin && post.status === 'draft' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        {lang === 'ko' ? '임시저장' : 'Draft'}
                      </span>
                    )}
                    {isAdmin && post.status === 'published' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-150 px-2.5 py-0.5 rounded-full">
                        {lang === 'ko' ? '게시됨' : 'Published'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-400 flex items-center gap-1 pr-14 group-hover:pr-0 transition-all">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-6 flex-grow whitespace-pre-wrap text-sm md:text-base opacity-85 line-clamp-4">
                  {getCleanSnippet(post.content)}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setViewingPost(post)}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer text-sm"
                    >
                        {lang === 'ko' ? '자세히 보기' : 'Read more'} <ChevronRight size={16} />
                    </button>
                    {isAdmin && post.status === 'draft' && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await updateDoc(doc(db, 'insights', post.id), {
                              status: 'published',
                              updatedAt: serverTimestamp()
                            });
                          } catch (err) {
                            console.error(err);
                            handleFirestoreError(err, OperationType.UPDATE, `insights/${post.id}`);
                          }
                        }}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        {lang === 'ko' ? '승인 및 게시' : 'Publish'}
                      </button>
                    )}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <input type="text" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'ko' ? '게시 상태' : 'Status'}</label>
                    <select 
                      value={editingPost.status || 'published'} 
                      onChange={e => setEditingPost({...editingPost, status: e.target.value})} 
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium text-slate-700"
                    >
                      <option value="draft">{lang === 'ko' ? '임시저장 (Draft)' : 'Draft'}</option>
                      <option value="published">{lang === 'ko' ? '게시됨 (Published)' : 'Published'}</option>
                    </select>
                  </div>
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

        {viewingPost && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button onClick={() => setViewingPost(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors z-10 cursor-pointer">
                <X size={24} />
              </button>

              {/* Modal Core Area */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                {/* Category & Date */}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-4 mt-2">
                  <ShieldAlert size={14} />
                  {viewingPost.category}
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 leading-snug">
                  {viewingPost.title}
                </h2>

                {/* Date */}
                <div className="text-xs text-slate-400 font-medium mb-6 flex items-center gap-1.5 pb-4 border-b border-slate-100">
                  <Calendar size={13} />
                  {viewingPost.date}
                </div>

                {/* Dynamic Styled Custom Content */}
                <div className="pb-4">
                  {renderFormattedContent(viewingPost.content)}
                </div>
              </div>

              {/* Close Footer Actions */}
              <div className="p-4 md:px-8 border-t border-slate-150 flex justify-end gap-3 bg-slate-50 rounded-b-3xl">
                <button onClick={() => setViewingPost(null)} className="px-6 py-2.5 font-bold text-sm text-slate-700 bg-slate-200/60 hover:bg-slate-200 rounded-xl transition-all cursor-pointer">
                  {lang === 'ko' ? '닫기' : 'Close'}
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
