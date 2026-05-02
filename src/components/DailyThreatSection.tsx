import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRight, Activity, Clock } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface DailyThreat {
  id: string;
  title: string;
  description: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  remediation: string;
  date: string;
}

interface Insight {
  id: string;
  title: string;
  category: string;
  createdAt?: any;
}

export default function DailyThreatSection() {
  const [threat, setThreat] = useState<DailyThreat | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const tQ = query(collection(db, 'daily_threats'), orderBy('date', 'desc'), limit(1));
        const tSnap = await getDocs(tQ);
        if (!tSnap.empty) {
          setThreat({ id: tSnap.docs[0].id, ...tSnap.docs[0].data() } as DailyThreat);
        }

        const iQ = query(collection(db, 'insights'), orderBy('createdAt', 'desc'), limit(3));
        const iSnap = await getDocs(iQ);
        const fetchedInsights = iSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Insight));
        setInsights(fetchedInsights);
        
      } catch (err) {
        console.error('Failed to fetch threat/insights', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getLevelColor = (level?: string) => {
    switch(level) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-brand-100 text-brand-500 border-brand-200';
    }
  };

  if (loading) return null;

  return (
    <section className="py-[120px] bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">오늘 당신의 회사를 노리는 위협</h2>
          <p className="text-xl text-slate-600">AI가 매일 분석한 최신 보안 위협 정보</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Daily Threat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-brand-800 text-white rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-bl-[100px] -z-0" />
            <div className="relative z-10">
              {threat ? (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <ShieldAlert className="text-red-400" size={28} />
                    </div>
                    <div>
                      <div className="text-brand-100 text-sm font-medium">{threat.date} 분석 리포트</div>
                      <div className={`mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border inline-block ${getLevelColor(threat.level)}`}>
                        위협 수준: {threat.level}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 leading-tight">{threat.title}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 line-clamp-4">
                    {threat.description}
                  </p>

                  <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                    <h4 className="font-bold text-brand-100 mb-2 flex items-center gap-2">
                       전문가 대응 가이드
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed line-clamp-3">
                      {threat.remediation}
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">최신 위협 정보가 없습니다.</div>
              )}
            </div>
          </motion.div>

          {/* Right: Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 border border-slate-100 rounded-[24px] p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="text-brand-500" size={24} /> 
                최신 인사이츠
              </h3>
            </div>
            
            <div className="flex-grow flex flex-col gap-6">
              {insights.length > 0 ? insights.map((insight, idx) => (
                <div key={insight.id || idx} className="group cursor-pointer pb-6 border-b border-slate-200 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 text-brand-500 text-xs font-bold mb-2">
                    <Clock size={12} />
                    <span>{insight.category || '보안 동향'}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-500 transition-colors leading-snug line-clamp-2">
                    {insight.title}
                  </h4>
                </div>
              )) : (
                <div className="text-slate-500">등록된 인사이츠가 없습니다.</div>
              )}
            </div>

            <Link to="/insights" className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between group cursor-pointer">
              <span className="font-bold text-slate-900 group-hover:text-brand-500 transition-colors">인사이츠 전체 보기</span>
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-brand-500 group-hover:bg-brand-50 transition-all">
                <ArrowRight size={18} className="text-slate-400 group-hover:text-brand-500" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
