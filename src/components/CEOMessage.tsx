import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function CEOMessage() {
  const { settings } = useSettings();

  return (
    <section id="ceo-message" className="py-[120px] bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-5/12 flex-shrink-0"
          >
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-100 relative shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <img 
                src={settings.profileImage || "/images/ceo_profile.jpg"} 
                alt="CEO 박배영" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "/images/ceo_profile.jpg";
                }}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl">
                <div className="font-bold text-slate-900 text-xl mb-1">{settings.company?.ceo || '박배영'}</div>
                <div className="text-brand-500 font-medium">로뎀시스템 대표이사</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-7/12"
          >
            <Quote size={64} className="text-brand-100 mb-8" />
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
              "보안은 제품만으로<br />
              완성되지 않습니다.<br />
              <span className="text-brand-500">사람과 프로세스, 그리고 신뢰</span>가<br />
              함께할 때 진정한 보안이 완성됩니다."
            </h2>
            <div className="text-xl text-slate-500 font-medium border-l-4 border-brand-500 pl-6 space-y-2">
              <p>15년 전 로뎀시스템을 창업할 때의 초심입니다.</p>
              <p>우리는 단순히 시스템을 구축하는 것을 넘어,</p>
              <p>고객의 비즈니스가 안전하게 성장할 수 있도록 돕는 러닝메이트입니다.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
