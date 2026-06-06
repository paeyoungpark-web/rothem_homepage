import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle } from 'lucide-react';
import { KAKAO_CHANNEL_URL } from '../lib/constants';

export default function ContactCTA() {
  return (
    <section className="py-[120px] bg-brand-800 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">보안이 걱정된다면, 먼저 물어보세요</h2>
          <p className="text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto">
            전문가가 24시간 내 직접 연락드립니다.<br/>
            어떤 질문이든 확실한 해답을 드리겠습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-5 text-lg font-bold rounded-xl text-slate-900 bg-[#FEE500] hover:bg-[#FEE500]/90 transition-all shadow-[0_10px_20px_rgba(254,229,0,0.15)] group"
            >
              <MessageCircle size={24} fill="#000" className="mr-3" />
              카카오톡으로 문의하기
            </a>
            
            <Link 
              to="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-5 text-lg font-bold rounded-xl text-white bg-brand-500 hover:bg-brand-400 border border-brand-400 transition-all shadow-[0_10px_20px_rgba(15,110,86,0.3)] group"
            >
              <Mail size={24} className="mr-3" />
              온라인 문의하기
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
