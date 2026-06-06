import { motion } from 'motion/react';
import { ShieldAlert, Lock, Cloud, Cpu, Car, CheckCircle, ArrowRight, Award, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      id: "iso27001",
      title: t('services.s1_title'),
      description: t('services.s1_desc'),
      href: "/services/iso27001",
      icon: <ShieldAlert size={32} strokeWidth={1.5} />
    },
    {
      id: "iso27701",
      title: t('services.s2_title'),
      description: t('services.s2_desc'),
      href: "/services/iso27701",
      icon: <Lock size={32} strokeWidth={1.5} />
    },
    {
      id: "iso27017",
      title: t('services.s3_title'),
      description: t('services.s3_desc'),
      href: "/services/iso27017",
      icon: <Cloud size={32} strokeWidth={1.5} />
    },
    {
      id: "iso42001",
      title: t('services.s4_title'),
      description: t('services.s4_desc'),
      href: "/services/iso42001",
      icon: <Cpu size={32} strokeWidth={1.5} />
    },
    {
      id: "tisax",
      title: t('services.s5_title'),
      description: t('services.s5_desc'),
      href: "/services/tisax",
      icon: <Car size={32} strokeWidth={1.5} />
    },
    {
      id: "ismsp",
      title: t('services.s6_title'),
      description: t('services.s6_desc'),
      href: "/services/ismsp",
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
              <Link to={service.href} className="mt-8 inline-flex items-center text-brand-500 font-bold group-hover:text-brand-400 transition-colors">
                자세히 보기
                <ArrowRight size={18} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* PROMINENT COMPREHENSIVE BROCHURE CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-950 p-8 md:p-12 rounded-[24px] text-white overflow-hidden relative shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-brand-500/20"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-4">
                <Award size={14} className="text-brand-300" />
                <span>독보적 역량 증명</span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
                로뎀시스템 프리미엄 통합 인증 컨설팅 <br/>
                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">마스터 소개서 (P1-P4 전체 프레임워크)</span>
              </h3>
              
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-6">
                실제 투입되는 정예 전문가 규모, 철저한 내부 사전 QA 방법론, 전용 기술 취약점 진단 점검 항목(73가지 이상), 그리고 핵심 산출물 마스터 패키지 리스트를 포함한 <strong>3페이지 분량의 심오한 안내 자료</strong>가 준비되어 있습니다.
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-brand-400" /> 정예 특급 컨설턴트 2인 전담</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-brand-400" /> 사내 예비 심사 무결점 통과 보증</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-brand-400" /> 10종 완벽 산출물 제공</span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Link 
                to="/brochure" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-md font-extrabold shadow-[0_8px_20px_rgba(15,110,86,0.25)] transition-all hover:-translate-y-1"
              >
                <FileText size={18} />
                <span>전체 소개서 보기 (인쇄용 제공)</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
