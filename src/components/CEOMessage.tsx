import { motion } from 'motion/react';
import { Quote, User } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function CEOMessage() {
  const { settings } = useSettings();

  return (
    <section id="ceo-message" className="py-[120px] bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Quote size={64} className="text-brand-100 dark:text-brand-900/30 mb-8" />
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-8">
              "보안은 제품만으로<br />
              완성되지 않습니다.<br />
              <span className="text-brand-500 dark:text-brand-400">사람과 프로세스, 그리고 신뢰</span>가<br />
              함께할 때 진정한 보안이 완성됩니다."
            </h2>
            <div className="text-xl text-slate-500 dark:text-slate-400 font-medium border-l-4 border-brand-500 pl-6 space-y-2 mb-10">
              <p>15년 전 로뎀시스템을 창업할 때의 초심입니다.</p>
              <p>우리는 단순히 시스템을 구축하는 것을 넘어,</p>
              <p>고객의 비즈니스가 안전하게 성장할 수 있도록 돕는 러닝메이트입니다.</p>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div>
                <div className="text-sm font-semibold text-brand-500 dark:text-brand-400">ROTHEMSYSTEM</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {settings.company?.ceo || '박배영'} 대표이사
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
