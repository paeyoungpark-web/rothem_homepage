import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
            <ShieldCheck size={16} />
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            {t('hero.title1')}<br />
            {t('hero.title2')}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10">
            {t('hero.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/#about" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              {t('hero.btn_about')}
              <ChevronRight className="ml-2 -mr-1" size={20} />
            </a>
            <a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
              {t('hero.btn_contact')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
