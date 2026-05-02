import { motion } from 'motion/react';
import { ShieldCheck, BrainCircuit, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t('about.title')}</h2>
          <p className="mt-4 text-lg text-slate-600">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center bg-slate-50 p-8 rounded-3xl border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('about.card1_title')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('about.card1_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center bg-slate-50 p-8 rounded-3xl border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <BrainCircuit size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('about.card2_title')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('about.card2_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center bg-slate-50 p-8 rounded-3xl border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Handshake size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('about.card3_title')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('about.card3_desc')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
