import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productData } from '../data/productData';
import { useEffect } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';
  const data = id ? productData[currentLang][id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button onClick={() => navigate('/products')} className="text-blue-600 hover:underline">
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            {currentLang === 'ko' ? '보안 솔루션 목록으로 돌아가기' : 'Back to Products'}
          </button>

          {/* AI Emphasis Alert for eSafeAI */}
          {data.aiEmphasis && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl flex items-start"
            >
              <ShieldAlert className="text-indigo-600 mr-4 shrink-0 mt-1" size={28} />
              <div>
                <h4 className="text-sm font-bold text-indigo-900 mb-2 uppercase tracking-wider">
                  {currentLang === 'ko' ? 'AI 안전성 특화 강점' : 'AI Safety Highlight'}
                </h4>
                <p className="text-indigo-800 leading-relaxed font-medium">
                  {data.aiEmphasis}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-8 md:p-12 bg-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-slate-200 text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">
                  <ShieldCheck size={14} className="mr-1.5" />
                  Soosan INT Authorized Solution
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h1>
                <p className="text-slate-300 text-lg md:text-xl font-light">{data.subtitle}</p>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 translate-y-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen opacity-30 blur-3xl"></div>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-12">
                {data.overview}
              </p>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  {currentLang === 'ko' ? '주요 기능 및 특장점' : 'Key Features'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.features.map((feature: any, idx: number) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
