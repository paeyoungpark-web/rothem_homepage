import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { serviceDetailsData } from '../data/serviceDetails';
import { useEffect } from 'react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';
  const data = id ? serviceDetailsData[currentLang][id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
            Return to Home
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
            onClick={() => navigate('/#services')}
            className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            {currentLang === 'ko' ? '서비스 목록으로 돌아가기' : 'Back to Services'}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-8 md:p-12 bg-blue-600 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-blue-100 text-sm font-medium mb-4 backdrop-blur-sm">
                  Rodem System Service
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{data.title}</h1>
                <p className="text-blue-100 text-lg md:text-xl font-light">{data.subtitle}</p>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-12">
                {data.overview}
              </p>

              <div className="space-y-12">
                {data.sections.map((section: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-100 pb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">
                        0{idx + 1}
                      </span>
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.items.map((item: string, itemIdx: number) => (
                        <li key={itemIdx} className="flex items-start">
                          <CheckCircle2 className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
                          <span className="text-slate-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
              <p className="text-slate-600 mb-6 font-medium">
                {currentLang === 'ko' ? '자세한 컨설팅 문의가 필요하신가요?' : 'Need more detailed consultation?'}
              </p>
              <button
                onClick={() => navigate('/#contact')}
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                {currentLang === 'ko' ? '상담 문의하기' : 'Contact Us'}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
