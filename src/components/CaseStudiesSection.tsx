import { motion } from 'motion/react';
import { Building2, Layers, HeartPulse, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function CaseStudiesSection() {
  const { t } = useTranslation();

  const cases = [
    {
      id: "case-fintech",
      company: "한국대형증권사 (A사)",
      industry: "금융 / 증권업",
      title: "대형 금융망 내부 가상망 분리 정보 보호 시스템 구축",
      challenge: "대규모 가상화 임직원 통신망에 대한 유통 통제 및 기밀 유출 선제 방어가 핵심 컴플라이언스로 요구됨.",
      solution: "수산INT 보안 가상망 솔루션과의 유기적 연계를 통한 악성코드 차단 통제 아키텍처 및 3,000대급 가상 클라이언트 안전한 네트워크 보안 시스템 실시간 이식 성공.",
      result: "사외 유출 취약성 99.8% 예방 수립 및 금감원 보안 감사 완벽 통과.",
      icon: <Building2 className="w-6 h-6 text-brand-500" />
    },
    {
      id: "case-manufacturing",
      company: "글로벌 스마트 제조 기업 (H사)",
      industry: "첨단 기계 / 스마트 팩토리",
      title: "스마트 공정 AI 경영시스템 ISO 42001 및 정보보호 27001 조기 통합 획득",
      challenge: "생산 공정 전반의 AI 자율 검사 모델 도입에 따라 AI 안정성, 데이터 거버넌스 및 글로벌 규제 동시 만족 요구.",
      solution: "로뎀시스템 전담 수석 심사원 2인 투입을 통한 P4 방법론 가이드 기반 맞춤 위험 평가 프로세스 및 73개 정밀 진단 취약점 쉘 스크립트 전수 검사.",
      result: "국제 규격 인증서 최단기 5개월 취득 완료 및 내부 QA를 통한 예비 심사 100% 무탈락 패스 달성.",
      icon: <Layers className="w-6 h-6 text-brand-500" />
    },
    {
      id: "case-healthcare",
      company: "메디컬 그룹 종합병원 (S병원)",
      industry: "의료 / 스마트 헬스케어",
      title: "대학병원 전자의무기록(EMR) 시스템 통제 및 개인정보보호 관리체계(ISMS-P) 강화",
      challenge: "민감 정보인 환자 의료 정보의 유출을 선제 방지하고 정보통신망법 개정에 따른 이행 평가를 실시간 입증해야 함.",
      solution: "개인정보 비식별화 암호화 가이드 적용 및 전용 계정 권한 마스터 승인 절차 보안 설계 자문 및 이행 감사 시행.",
      result: "과기정통부 및 KISA 주관 ISMS-P 인증 무결점 갱신 및 정보 유출 사고 제로 보장.",
      icon: <HeartPulse className="w-6 h-6 text-brand-500" />
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-white transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest block mb-4">SUCCESS STORY SHOWCASE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            신뢰로 일궈낸 도입사례
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto col-span-2">
            국내 유수 대기업, 금융기관, 의료기관이 로뎀시스템을 비즈니스 영속성과 보안 인프라 완성의 동반자로 선택하였습니다.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((csc, idx) => (
            <motion.div
              key={csc.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col h-full bg-slate-50/70 border border-slate-100 rounded-[24px] p-8 md:p-10 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,110,86,0.06)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Badge info */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{csc.industry}</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-brand-500 bg-brand-50 border border-brand-100 rounded-full px-2.5 py-1">
                  {csc.company}
                </span>
              </div>

              {/* Title layout */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-500 transition-colors mb-6 leading-snug">
                {csc.title}
              </h3>

              {/* Content sections split */}
              <div className="space-y-4 flex-grow mb-8 text-sm">
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    도입 전 당면과제 (Challenge)
                  </h4>
                  <p className="text-slate-600 leading-relaxed pl-3 font-light">
                    {csc.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    수행 솔루션 (Solution)
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-3 font-light">
                    {csc.solution}
                  </p>
                </div>
              </div>

              {/* Result container */}
              <div className="bg-brand-500/5 group-hover:bg-brand-500/10 border border-brand-200/20 rounded-xl p-4 mt-auto">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle size={16} className="text-brand-500 flex-shrink-0" />
                  <span className="text-xs font-extrabold text-brand-800">성장지표 / 구축 성과 (Result)</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {csc.result}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* CTA Banner inside */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400 font-medium mb-4">
            * 로뎀시스템은 파트너십 보안 기밀유지 계약(NDA)에 기여하기 위해 실제 도입사의 세부 사명은 영문 이니셜로 일괄 블라인드 처리하고 보안 감사를 이수하였습니다.
          </p>
          <Link 
            to="/inquiries" 
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-500 hover:text-brand-600 cursor-pointer"
          >
            <span>유사한 부문 맞춤 시스템 설계 문의하기</span>
            <Send size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
