import { motion } from 'motion/react';
import { ShieldCheck, Users, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import { KAKAO_CHANNEL_URL } from '../lib/constants';

export default function AdvisorySection() {
  const advisoryServices = [
    {
      id: "ciso",
      title: "CISO 자문 서비스 (정보보호 최고책임자)",
      subtitle: "전문 CISO 부재 리스크 해소 및 컴플라이언스 완벽 대응",
      description: "정보보호 최고책임자 지정 및 자격을 완벽히 구비한 특급 자문단이 기업의 CISO 역할을 수행하거나 밀착 보좌합니다. 보안 로드맵 수립부터 대외 심사 대응까지 총괄 지원합니다.",
      features: [
        "지정 신고 자격 가이드 및 실이행 업무 표준화",
        "연간 정보보호 계획 수립 및 이사회 보고 체계 지원",
        "보안 리스크 분석 및 침해 사고 대응 거버넌스 구축"
      ],
      icon: <ShieldCheck className="w-8 h-8 text-brand-500" />
    },
    {
      id: "executive",
      title: "경영진 및 비즈니스 의사결정 자문",
      subtitle: "신규 비즈니스 리스크 조기 식별 및 IT 투자 최적화 자문",
      description: "클라우드 마이그레이션, 인공지능(AI) 솔루션 도입 등 경영진의 중대한 의사결정 단계에서 발생할 수 있는 보안 리스크와 컴플라이언스 상의 제약을 공학적·경영학적 관점에서 사전 진단 및 자문합니다.",
      features: [
        "IT 인프라 신규 도입 전 보안 타당성 사전 평가(PoC 자문)",
        "비즈니스 연속성 계획(BCP) 및 재해 복구(DR) 자문",
        "합리적인 정보보호 투자 효과(ROSI) 분석 및 리포팅"
      ],
      icon: <Users className="w-8 h-8 text-brand-500" />
    },
    {
      id: "legal",
      title: "보안 법률 및 컴플라이언스 상시 대응",
      subtitle: "개인정보보호법, 망법, 전자금융감독규정 등 완벽 가이드",
      description: "고도로 변화하는 법률 가이드라인에 대한 해석 오류 리스크를 전면 차단합니다. 로뎀시스템의 수석 전문 위원과 협력 법률 자문단이 상시 동행하여 법적 처벌 및 과징금 리스크를 선제 봉쇄합니다.",
      features: [
        "국내 정보통신망법 및 개인정보보호법 개정안 상시 반영 검토",
        "EU-GDPR, CCPA 등 글로벌 개인정보보호 규정 역외 적용 대책",
        "유사시 법적 책임 소재 소명 자료 구성 및 기술 감정 조력"
      ],
      icon: <Scale className="w-8 h-8 text-brand-500" />
    }
  ];

  return (
    <section id="advisory" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest block mb-3">TRUSTED SECURITY ADVISORY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            전문 자문 서비스
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            단순 기술적 판단에 그치지 않고 경영학적 비즈니스 기회 창출과 완벽한 규제 준수를 통합 보장하는 독보적인 특급 자문 품질을 선사합니다.
          </p>
        </div>

        {/* Advisory Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {advisoryServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-850 p-8 md:p-10 rounded-[24px] border border-slate-100 dark:border-slate-800/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all group flex flex-col h-full relative"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white dark:group-hover:bg-brand-500 transition-all duration-300">
                <div className="group-hover:scale-110 transition-transform duration-300 text-brand-500 group-hover:text-white">
                  {service.icon}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-xs font-semibold text-brand-500 dark:text-brand-400 mb-6">
                {service.subtitle}
              </p>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Features checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6 font-medium">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Instant consult button */}
              <a 
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 dark:text-brand-400 group-hover:text-brand-600 transition-colors mt-auto"
              >
                <span>해당 부문 1:1 실시간 무료 자문 신청</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
