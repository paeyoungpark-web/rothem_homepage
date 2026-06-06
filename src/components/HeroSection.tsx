import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { KAKAO_CHANNEL_URL } from '../lib/constants';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-800 overflow-hidden pt-20">
      {/* Background Graphic Abstract */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full text-brand-500 animate-pulse" style={{ animationDuration: '4s' }}>
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="400" cy="400" r="300" strokeDasharray="10 20" />
            <circle cx="400" cy="400" r="200" strokeDasharray="5 10" />
            <path d="M100 400 L700 400 M400 100 L400 700" strokeDasharray="5 5" opacity="0.5" />
            <circle cx="400" cy="400" r="100" fill="currentColor" fillOpacity="0.1" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-800/90 to-transparent z-0" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500 bg-brand-100/10 text-brand-100 text-sm font-semibold mb-8">
              <ShieldCheck size={16} className="text-brand-400" />
              2010년 설립 · 보안 전문기업 15년
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
              사이버 위협 앞에<br />
              <span className="text-brand-400">당신 편</span>에 서 있습니다.
            </h1>
            
            <p className="text-xl text-slate-300 font-light mb-12 leading-relaxed">
              보안 솔루션 공급, ISO 인증 컨설팅, 전문가 자문.<br />
              로뎀시스템은 15년간 고객 곁을 지켜왔습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/#solutions" className="inline-flex items-center justify-center px-6 py-4 text-base font-bold rounded-xl text-white bg-brand-500 hover:bg-brand-400 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(15,110,86,0.2)]">
                솔루션 살펴보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/brochure" className="inline-flex items-center justify-center px-6 py-4 text-base font-bold rounded-xl text-brand-100 bg-white/10 border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all">
                ✨ 프리미엄 소개서 보기
              </Link>
              <a 
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold rounded-xl text-brand-800 bg-[#FEE500] hover:bg-[#FEE500]/90 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(254,229,0,0.15)]"
              >
                카카오톡 문의
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-300 text-base font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-400" />
                <span>고객사 45개+</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-400" />
                <span>운영장비 117대+</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-400" />
                <span>컨설팅 100건+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
