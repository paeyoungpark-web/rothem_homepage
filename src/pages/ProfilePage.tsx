import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Linkedin, CheckCircle2, Award, Briefcase, GraduationCap, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { profileData } from '../data/profileData';
import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function ProfilePage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';
  const data = profileData[currentLang];
  const { settings } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            {currentLang === 'ko' ? '돌아가기' : 'Go Back'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Profile Card */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-32 text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-50 shadow-md mb-6 relative bg-blue-100 flex items-center justify-center">
                  <img 
                    src={settings.profileImage || "https://media.licdn.com/dms/image/v2/D5603AQHWKX_mYMTO4g/profile-displayphoto-crop_800_800/B56ZyjXY.eKkAI-/0/1772267348633?e=1779321600&v=beta&t=kRXt0Qt1IDL_iugfHNazIyfulwbK3pL7rd8xjORQgUQ"} 
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-4 border border-green-100">
                  <ShieldCheck size={14} />
                  {currentLang === 'ko' ? 'ISO 공인 선임심사원' : 'Certified Lead Auditor'}
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">{data.name}</h1>
                <p className="text-slate-600 font-medium mb-1">{data.title}</p>
                <p className="text-slate-500 text-sm mb-8">{data.subtitle}</p>

                <a 
                  href={data.linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Linkedin size={20} />
                  LinkedIn Connect
                </a>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{currentLang === 'ko' ? '소개' : 'Summary'}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {data.summary}
                </p>
              </motion.div>

              {/* Certifications */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                    <Award size={24} />
                  </span>
                  {data.sections.certifications.title}
                </h3>
                <ul className="space-y-4">
                  {data.sections.certifications.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Experience Categories */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                    <ShieldCheck size={24} />
                  </span>
                  {data.sections.experience.title}
                </h3>
                
                <div className="space-y-8">
                  {data.sections.experience.categories.map((cat: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-slate-100 pl-6 pb-2 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 border-2 border-white"></div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">{cat.name}</h4>
                      <ul className="space-y-2">
                        {cat.points.map((point: string, pIdx: number) => (
                          <li key={pIdx} className="text-slate-600 relative pl-4">
                            <span className="absolute left-0 top-[10px] w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Career & Education Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="p-2 bg-slate-800 text-blue-400 rounded-lg mr-3">
                      <Briefcase size={24} />
                    </span>
                    {data.sections.career.title}
                  </h3>
                  <ul className="space-y-4">
                    {data.sections.career.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex flex-col text-slate-300">
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-600 rounded-3xl p-8 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="p-2 bg-blue-500 text-white rounded-lg mr-3">
                      <GraduationCap size={24} />
                    </span>
                    {data.sections.education.title}
                  </h3>
                  <ul className="space-y-5">
                    {data.sections.education.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-blue-100">
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* CEO Activities */}
              {settings.activities && settings.activities.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                      <Award size={24} />
                    </span>
                    {currentLang === 'ko' ? '대표이사 활동' : 'CEO Activities'}
                  </h3>
                  
                  <div className="flex flex-col gap-8">
                    {settings.activities.map((act) => (
                      <div key={act.id} className="flex flex-col md:flex-row gap-6 p-4 md:p-0 group">
                        <div className="w-full md:w-2/5 aspect-video rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
                          <img 
                            src={act.image} 
                            alt={act.title || 'CEO Activity'} 
                            className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          {act.date && (
                            <span className="text-sm font-semibold text-blue-600 mb-2">{act.date}</span>
                          )}
                          <h4 className="text-xl font-bold text-slate-900 mb-3">{act.title}</h4>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
