import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function SolutionShowcase() {
  const [extraProducts, setExtraProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (!querySnapshot.empty) {
          const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setExtraProducts(fetched);
        }
      } catch (err) {
        console.error("Failed to fetch extra products", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section id="solutions" className="py-[120px] bg-brand-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">취급 보안 솔루션</h2>
          <p className="text-xl text-slate-600">검증된 제품을 직접 공급합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Product Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] p-10 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-brand-500/10 min-h-[400px] flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-bl-[100px] -z-10" />
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-500 text-sm font-bold w-max">
              <Shield size={16} />
              주력 제품
            </div>
            
            <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">eWalker SWG</h3>
            <p className="text-xl text-brand-500 font-bold mb-4">보안 웹 게이트웨이 전문 솔루션</p>
            <p className="text-slate-600 text-lg mb-10 flex-grow">
              현재 45개 고객사, 117대 운영 중<br />
              강력한 웹 보안 및 모니터링을 경험하세요.
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <a href="/products" className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-brand-500 transition-colors">
                자세히 보기
              </a>
              <a href="/#contact" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-slate-900 font-bold border border-slate-200 hover:border-brand-500 hover:text-brand-500 transition-colors">
                견적 요청
              </a>
            </div>
          </motion.div>

          {/* Render extra products from Firebase, if any */}
          {extraProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {extraProducts.slice(0, 2).map((prod, idx) => (
                <motion.div
                  key={prod.id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-center"
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{prod.name || '추가 보안 솔루션'}</h4>
                  <p className="text-slate-600 mb-6">{prod.description || '엔터프라이즈 보안을 위한 부가 솔루션입니다.'}</p>
                  <a href="/products" className="inline-flex items-center text-brand-500 font-bold hover:text-brand-400">
                    알아보기 <ArrowRight size={18} className="ml-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {/* Placeholders if no data in db */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col justify-center"
              >
                <div className="text-slate-400 font-bold mb-2">보안관제 솔루션</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">통합 로그 분석 (SIEM)</h4>
                <p className="text-slate-600 mb-6">다양한 장비의 로그를 수집하고 이상 징후를 탐지합니다.</p>
                <a href="/products" className="inline-flex items-center text-brand-500 font-bold hover:text-brand-400">
                  알아보기 <ArrowRight size={18} className="ml-1" />
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col justify-center"
              >
                <div className="text-slate-400 font-bold mb-2">취약점 점검</div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">웹 취약점 진단 솔루션</h4>
                <p className="text-slate-600 mb-6">최신 위협 동향을 반영한 자동화된 취약점 점검을 제공합니다.</p>
                <a href="/products" className="inline-flex items-center text-brand-500 font-bold hover:text-brand-400">
                  알아보기 <ArrowRight size={18} className="ml-1" />
                </a>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
