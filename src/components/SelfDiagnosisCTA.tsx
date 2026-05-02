import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function SelfDiagnosisCTA() {
  return (
    <section className="py-24 bg-brand-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 Z" fill="rgba(29, 158, 117, 0.05)" />
        </svg>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-brand-500 tracking-tight mb-8">
            우리 회사 보안, 지금 몇 점일까요?
          </h2>
          <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto">
            자체 개발한 3분 자가진단표를 통해 취약점을 바로 확인하세요. 
            진단 결과에 따른 맞춤형 가이드를 무료로 제공해 드립니다.
          </p>
          <a href="/checklist" className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-2xl text-white bg-brand-500 hover:bg-brand-400 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(15,110,86,0.2)]">
            무료 보안 자가진단
            <ArrowRight className="ml-3 h-6 w-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
