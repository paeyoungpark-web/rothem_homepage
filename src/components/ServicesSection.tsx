import { motion } from 'motion/react';
import { Server, ShieldAlert, Lock, Cloud, Cpu, Car, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      id: "iso27001",
      title: t('services.s1_title'),
      description: t('services.s1_desc'),
      href: "/#contact",
      icon: <ShieldAlert size={32} strokeWidth={1.5} />
    },
    {
      id: "iso27701",
      title: t('services.s2_title'),
      description: t('services.s2_desc'),
      href: "/#contact",
      icon: <Lock size={32} strokeWidth={1.5} />
    },
    {
      id: "iso27017",
      title: t('services.s3_title'),
      description: t('services.s3_desc'),
      href: "/#contact",
      icon: <Cloud size={32} strokeWidth={1.5} />
    },
    {
      id: "iso42001",
      title: t('services.s4_title'),
      description: t('services.s4_desc'),
      href: "/#contact",
      icon: <Cpu size={32} strokeWidth={1.5} />
    },
    {
      id: "tisax",
      title: t('services.s5_title'),
      description: t('services.s5_desc'),
      href: "/#contact",
      icon: <Car size={32} strokeWidth={1.5} />
    },
    {
      id: "ismsp",
      title: t('services.s6_title'),
      description: t('services.s6_desc'),
      href: "/#contact",
      icon: <CheckCircle size={32} strokeWidth={1.5} />
    }
  ];

  return (
    <section id="services" className="py-[120px] bg-white transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{t('services.title')}</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 rounded-[16px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all group flex flex-col h-full hover:-translate-y-1 relative"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 mb-8 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed flex-grow">
                {service.description}
              </p>
              <a href={service.href} className="mt-8 inline-flex items-center text-brand-500 font-bold group-hover:text-brand-400 transition-colors">
                자세히 보기
                <ArrowRight size={18} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
