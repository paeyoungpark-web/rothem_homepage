import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productData } from '../data/productData';
import { ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function ProductsPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = Object.entries(productData[currentLang]).map(([id, p]) => ({ id, ...p }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6 border border-blue-100"
            >
              <ShieldCheck size={16} className="mr-2" />
              {currentLang === 'ko' ? '수산아이앤티 영남권 공인 파트너사' : 'SOOSAN INT Yeongnam Authorized Partner'}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              {currentLang === 'ko' ? '최적의 차세대 보안 솔루션' : 'Next-Generation Security Solutions'}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              {currentLang === 'ko' 
                ? '로뎀시스템은 강력한 네트워크 및 데이터 유출 방지 기술을 보유한 수산아이앤티와 함께, 다변화하는 비즈니스 환경과 AI 도입에 대응하는 맞춤형 보안체계를 제공합니다.'
                : 'rothemsystem, in partnership with SOOSAN INT, provides customized security systems to respond to diverse business environments and AI integration.'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any, idx: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => navigate(`/products/${product.id}`)}
                className={`bg-white rounded-3xl p-8 shadow-sm border transition-all cursor-pointer group hover:-translate-y-2 ${
                  product.aiEmphasis ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-slate-200 hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                {product.aiEmphasis && (
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-4">
                    <Sparkles size={12} className="mr-1" />
                    AI Security Highlight
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {product.title.split('(')[0].trim()}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  {product.subtitle}
                </p>
                <p className="text-slate-600 leading-relaxed text-sm mb-8 line-clamp-3">
                  {product.overview}
                </p>
                
                <div className="mt-auto flex items-center text-blue-600 font-medium text-sm group-hover:underline">
                  {currentLang === 'ko' ? '제품 상세보기' : 'View Details'}
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
