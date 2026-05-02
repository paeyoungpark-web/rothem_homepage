import { motion } from 'motion/react';
import { Server, Lock, ShieldAlert, Cpu, Cloud, Car, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ServicesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      id: "iso27001",
      title: t('services.s1_title'),
      description: t('services.s1_desc'),
      icon: <ShieldAlert size={28} />
    },
    {
      id: "iso27701",
      title: t('services.s2_title'),
      description: t('services.s2_desc'),
      icon: <Lock size={28} />
    },
    {
      id: "iso27017",
      title: t('services.s3_title'),
      description: t('services.s3_desc'),
      icon: <Cloud size={28} />
    },
    {
      id: "iso42001",
      title: t('services.s4_title'),
      description: t('services.s4_desc'),
      icon: <Cpu size={28} />
    },
    {
      id: "tisax",
      title: t('services.s5_title'),
      description: t('services.s5_desc'),
      icon: <Car size={28} />
    },
    {
      id: "ismsp",
      title: t('services.s6_title'),
      description: t('services.s6_desc'),
      icon: <CheckCircle size={28} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{t('services.title')}</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/services/${service.id}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-8 right-8 text-slate-200 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300">
                <ArrowRight size={20} />
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 pr-6">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
