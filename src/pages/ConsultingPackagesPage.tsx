import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Shield, 
  Brain, 
  Lock, 
  FileText, 
  Users, 
  ArrowRight,
  Database,
  Search,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// Packages data
const packages = [
  {
    id: 'starter',
    name: 'Starter Package',
    tagline: '인증 첫 도입 및 소규모 조직에 적합',
    target: '스타트업 · 중소기업 · 정보보호 입문',
    price: '1,500만원',
    priceNote: '부터 (범위에 따라 유동)',
    color: 'slate',
    badge: null,
    features: [
      { text: 'ISO 27001 또는 ISO 42001 (단일 인증)', included: true },
      { text: '현황 분석 및 종합 GAP 분석', included: true },
      { text: '정보보호 정책·지침 가이드라인 수립', included: true },
      { text: '핵심 실무 산출물 제공 (인증 통과용 필수 40종+)', included: true },
      { text: '인증 최초/본심사 밀착 수검 대응 (1회)', included: true },
      { text: '구독 관리 및 연간 사후 심사', included: false },
      { text: '서버/NW/DB 종합 취약점 정밀 진단', included: false },
      { text: 'Web/Mobile 모의해킹 실무 침투 수행', included: false },
    ],
    cta: '문의하기',
  },
  {
    id: 'standard',
    name: 'Standard Package',
    tagline: '본격적인 정보보호 관리체계 확립 & 인증 유지',
    target: '중견/엔터프라이즈 기업 · 다중 인증',
    price: '별도 산정',
    priceNote: '무료 사전 GAP 자문 후 견적',
    color: 'brand',
    badge: '가장 많이 찾는 추천 구성',
    features: [
      { text: 'ISO 27001 + ISO 27701 (개인정보보호) 통합 구축', included: true },
      { text: '현황 분석 및 종합 GAP 분석', included: true },
      { text: '정보자산 정밀 식별 및 가치 분류 체계 구축', included: true },
      { text: '수준 높은 로뎀 표준 보안 규정/지침 전체 구축 (100종+)', included: true },
      { text: '서버·네트워크·데이터베이스·PC·웹 종합 안전 진단', included: true },
      { text: 'Web / API 모의해킹 (로뎀 정예 화이트해커팀 수행)', included: true },
      { text: '인증 심사 및 상시 사후 보증 (1년)', included: true },
      { text: 'ISMS-P 통합 자문 연계 지원', included: true },
    ],
    cta: '맞춤 견적 상담 받기',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    tagline: '글로벌 보안 컴플라이언스 및 지속 가능한 자문',
    target: '대기업 · 공공기관 · 법적 의무 대상자',
    price: '별도 산정',
    priceNote: '조직 규모 및 가중치 반영',
    color: 'dark',
    badge: 'Premium Multi-Audit',
    features: [
      { text: 'ISMS-P + ISO 27001/27701/27017/42001 (동시 수행)', included: true },
      { text: '전사적 거버넌스 위험관리체계(ERM) 커스터마이징', included: true },
      { text: '상시 내부 인적/기술적 자산 침투 및 정밀 취약점 분석', included: true },
      { text: '자동차 공급망 필수 보안인증 TISAX 대응 자문', included: true },
      { text: '월 1회 전문 CISO 지정 방문 정기 상임 자문', included: true },
      { text: '개인정보보호법 개정에 따른 즉각적 가이드라인 업데이트', included: true },
      { text: '임직원 및 경영진 대상 맞춤형 대면 보안 교육 프로그램', included: true },
      { text: '연간 사후 심사 완벽 무결점 보장 케어', included: true },
    ],
    cta: '전담 파트너 지정 상담 예약',
  },
];

// Document codes from the actual checklist screenshot - incredibly authentic!
const KcsDocuments = [
  { code: 'KCS-M-04(0)', name: '정보보호 경영시스템 매뉴얼', desc: '경영진 책임 및 전반적인 정보보호 관리체계 기본 헌장' },
  { code: 'KCS-OZ-0700(1)', name: '관리적보안규정', desc: '조직 구성원의 관리 통제 표준 절차 및 의무 사항' },
  { code: 'KCS-OZ-0701(1)', name: '내부정보보호감사지침', desc: '정기 보안 내부 점검을 위한 감사 계획 및 가이드라인' },
  { code: 'KCS-OZ-0702(1)', name: '위험관리지침', desc: '보안 자산 위험 분석, 식별 및 정량적 평정·수용 절차' },
  { code: 'KCS-OZ-0703(1)', name: '사업연속성관리지침', desc: '재난·재해 등 대내외 유선 돌발 상황 시 긴급 대응 체계 보장' },
  { code: 'KCS-OZ-0704(1)', name: '정보보호실행계획지침', desc: '연도별 세부 경영 보호 시행 목표 수립 및 이행 점검' },
  { code: 'KCS-OZ-0705(1)', name: '법률준수에관한 지침', desc: '정통망법, 개인정보보호법 등 최신 개정 법령 모니터링 가이드' },
  { code: 'KCS-OZ-0706(1)', name: '아웃소싱보안지침', desc: '외주 개발 및 상주 협력 업체 선정·점검·파기 통제 조항' },
  { code: 'KCS-OZ-0707(1)', name: '프로젝트관리지침', desc: '수행 사업 시 각 단계별 신규 위협 완화 및 기밀성 관리' },
  { code: 'KCS-OZ-0800(1)', name: '인적보안규정', desc: '입퇴사자 보안 서약, 이행 서류, 직무 분리 가이드' },
  { code: 'KCS-OZ-0801(1)', name: '개인정보보호지침', desc: '사용자 고유식별정보 처리 라이프사이클 및 최소 권한' },
  { code: 'KCS-OZ-0900(1)', name: '물리적보안규정', desc: '통제 구역, 사무실, 이중 백업실 등 출입 관리 규정' },
  { code: 'KCS-OZ-1000(1)', name: '기술적보안규정', desc: '서버, 시스템, 소스코드, 방화벽 통신 통제 표준' },
  { code: 'KCS-OZ-1001(1)', name: '접근통제지침', desc: 'VPN, DB 접근 로그 모니터링 및 패스워드 정책 관리' },
  { code: 'KCS-OZ-1002(1)', name: '보안사고처리지침', desc: '해킹 침해사고 의심 시 즉각적 전파, 격리, 복구 시나리오' },
  { code: 'KCS-OZ-1003(1)', name: '시스템운영관리지침', desc: '정기 패치, 이중화, 변경 관리 및 로그 무결성 관리' },
];

const faqs = [
  {
    q: '로뎀시스템 컨설팅 비용 산정 기준은 무엇인가요?',
    a: '기본 시작 비용은 Starter 기준 1,500만원(부가세 별도) 수준입니다. 이후 컨설팅 범위(인증 인원, 물리적 사무실 수, 클라우드 인프라 리소스 규모, 취약점 정밀 진단 및 모의해킹 대상 서버/웹/앱/API의 갯수 등)에 따라 합리적 공수 투입에 기반하여 산출하게 됩니다.',
  },
  {
    q: '컨설팅 계약시, 실제 제공되는 산출물은 로뎀시스템만의 특허인가요?',
    a: '네. 로뎀시스템은 15년간 공공, 의료, 대학, 일반 대기업 등 100회 이상의 보안 연계 자문을 성공시키며 완성한 체계적인 가이드북 양식군을 보유하고 있습니다. KCS-M-04(0) 및 KCS-OZ 계열로 이어지는 100종 이상의 공식 지침, 절차서 일체를 고객사의 사내 규정에 1:1 결합 설계하여 심사 한 번에 통과할 수 있도록 무결 가이드라인을 이식합니다.',
  },
  {
    q: 'ISO 42001(AI 경영시스템)은 타 인증과 함께 진행 가능한가요?',
    a: '적극 권장합니다. 보통 ISO 27001이나 ISO 27701을 보유 중이거나 동시 준비 중이실 때 AI 관련 규제 컴플라이언스(예: EU AI Act, 과학기술정보통신부 가이드라인)를 동시 세팅하면 통제 영역이 약 40% 이상 중첩되어 전체 도입 시간과 예산을 획기적으로 줄일 수 있습니다.',
  },
  {
    q: '인증 심사 결과가 부적합인 경우 무상 사후 지원을 보증해주시나요?',
    a: '당연합니다. 로뎀시스템은 체결된 범위 내에서 보안 인증을 안전히 취득할 때까지 전 단계 수검 대응 책임을 집니다. 만약 심사 과정에서 중대한 결함이나 시정 요구 조건이 제기되는 경우, 보완 완료 및 실질 인증 획득 시점까지 무상으로 수정을 밀착 지원합니다.',
  },
  {
    q: '취약점 정밀 진단과 모의해킹 서비스도 별도로 의뢰할 수 있나요?',
    a: '네, 가능합니다. 자체적인 연간 모의해킹 의무 사항을 충족하기 위한 별도 진단도 환영합니다. 로뎀시스템 내부의 보안 기술 연구소 소속 숙련된 화이트해커팀이 최신 해킹 시나리오 위주로 취약점을 분석하고 구체적인 완화 패치를 제공해 드립니다.',
  }
];

export default function ConsultingPackagesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDocSearch, setShowDocSearch] = useState('');

  const filteredDocs = KcsDocuments.filter(doc =>
    doc.name.includes(showDocSearch) || doc.code.toLowerCase().includes(showDocSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <SEO 
        title="컨설팅 패키지 및 투명 가격 안내 | 로뎀시스템" 
        description="로뎀시스템의 투명한 가격 정책과 15년간 축적된 KCS 100여 종의 산출물을 확인하세요. 기본 패키지부터 인공지능(ISO 42001) 및 종합 ISMS-P 자문까지 최적의 견적을 제공합니다."
      />
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white py-20 px-4 md:px-8 border-b border-white/5 relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-6 text-brand-300">
              <Sparkles size={14} className="text-brand-400 animate-pulse" />
              투명한 예산 예측 · 15년 노하우 밀착 이식
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              체계적인 컨설팅 패키지 & 단가 가이드
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              매번 정가 없이 불투명하던 보안 자문 단가, 이제 설계에 맞추어 명쾌하게 제안받아 보십시오.
              <br />
              <span className="text-brand-400 font-bold">100종 이상의 실제 보안 규정집 산출체계</span>(KCS-M-04 계열)를 완벽히 구축해 주어 한 번에 합격하도록 돕습니다.
            </p>
          </div>
        </section>

        {/* Core Pricing Packages */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/60 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {packages.map((pkg) => {
                const isHighlight = pkg.id === 'standard';
                return (
                  <div
                    key={pkg.id}
                    id={`pkg-${pkg.id}`}
                    className={`relative rounded-3xl p-6 md:p-8 transition-all duration-300 ${
                      isHighlight
                        ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-2xl scale-100 lg:scale-105 border-2 border-brand-500 z-10'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-lg border border-slate-100 dark:border-slate-700/60'
                    }`}
                  >
                    {pkg.badge && (
                      <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md ${
                        isHighlight ? 'bg-white text-brand-600' : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                      }`}>
                        {pkg.badge}
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className={`text-2xl font-black tracking-tight ${isHighlight ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-xs font-semibold mt-1.5 ${isHighlight ? 'text-brand-200' : 'text-brand-600 dark:text-brand-400'}`}>
                        {pkg.target}
                      </p>
                      <p className={`text-sm mt-2 leading-relaxed ${isHighlight ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className={`pb-6 mb-6 border-b ${isHighlight ? 'border-white/20' : 'border-slate-100 dark:border-slate-700/60'}`}>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className={`text-3xl md:text-4xl font-extrabold ${isHighlight ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
                          {pkg.price}
                        </span>
                        <span className={`text-xs font-semibold ${isHighlight ? 'text-brand-150' : 'text-slate-500'}`}>
                          {pkg.priceNote}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm">
                          {feat.included ? (
                            <Check size={18} className={`flex-shrink-0 mt-0.5 ${isHighlight ? 'text-white' : 'text-brand-500'}`} />
                          ) : (
                            <X size={18} className={`flex-shrink-0 mt-0.5 ${isHighlight ? 'text-brand-300/30' : 'text-slate-300 dark:text-slate-600'}`} />
                          )}
                          <span className={
                            feat.included
                              ? (isHighlight ? 'text-white' : 'text-slate-700 dark:text-slate-300')
                              : (isHighlight ? 'text-brand-200/40 line-through' : 'text-slate-400 dark:text-slate-500 line-through')
                          }>
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/inquiries"
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-xs cursor-pointer ${
                        isHighlight
                          ? 'bg-white text-brand-600 hover:bg-brand-50 shadow-md'
                          : 'bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                      }`}
                    >
                      {pkg.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs text-slate-400 mt-10">
              ※ 제시된 단가는 사내 보안 규정 가이드 수립 자문 포함 부가세 별도 가격입니다. 자세한 범위 측정을 위한 무료 1:1 진단 요청도 가능합니다.
            </p>
          </div>
        </section>

        {/* Interactive KCS High-fidelity Deliverables Showcase */}
        <section className="py-24 bg-white dark:bg-slate-950 px-4 transition-colors">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold mb-4">
                <FileText size={14} />
                로뎀시스템 정식 산출물 체계 가이드
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                실제 제공되는 정보보호 규정 산출 문서
              </h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-2">
                컨설팅 완료 시 즉시 귀사 사명으로 승인 가능한 정식 기안용 지침 및 운영 관리 대장 목록의 핵심 부분입니다. 
                로뎀이 보유한 탄탄한 규정 표준(KCS 계열)을 직접 확인해 보세요.
              </p>
            </div>

            {/* Document search bar */}
            <div className="mb-8 max-w-md mx-auto relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="문서명 또는 예) KCS-OZ 검색..."
                value={showDocSearch}
                onChange={(e) => setShowDocSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-medium"
              />
            </div>

            {/* Documents Grid Table */}
            <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-xs">
              <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase select-none">
                      <th className="p-4 pl-6 w-32">분류 코드</th>
                      <th className="p-4">정식 문서명</th>
                      <th className="p-4 hidden md:table-cell">문서 주요 명세 및 이식 목적</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredDocs.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-12 text-center text-slate-400 dark:text-slate-500 font-medium">검색어와 일치하는 규정집이 없습니다.</td>
                      </tr>
                    ) : (
                      filteredDocs.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-brand-50/40 dark:hover:bg-brand-950/20 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-slate-400 dark:text-slate-500">
                            {doc.code}
                          </td>
                          <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                            {doc.name}
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400 hidden md:table-cell text-xs leading-relaxed">
                            {doc.desc}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sample PDF CTA Row */}
            <div className="mt-10 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-700 text-white text-center shadow-lg relative overflow-hidden select-none">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Database size={120} />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-2 flex items-center justify-center gap-1.5 flex-wrap">
                <CheckCircle2 size={22} className="text-brand-300 animate-bounce" />
                정식 통합 산출물 목록 샘플 PDF 배포
              </h3>
              <p className="text-sm text-brand-100 max-w-2xl mx-auto mb-6">
                현재 보신 KCS 계약 전용 가이드 목록 전체와 공점검 핵심 조치 양식을 일부 가공 보정한 무상 가독본을 E-Mail로 배부해 드립니다.
              </p>
              <Link
                to="/inquiries?type=sample"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-bold hover:bg-brand-50 hover:scale-103 active:scale-98 text-xs md:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Download size={16} />
                산출물 구성 예시본 배송 안내
              </Link>
            </div>
          </div>
        </section>

        {/* Specialized Focus Areas */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/60 transition-colors px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-3xl font-black tracking-tight mb-16">
              로뎀만의 압도적인 전문성 라인업
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-sm">
                <Shield className="text-brand-600 dark:text-brand-400 mb-4" size={36} />
                <h3 className="text-lg md:text-xl font-bold mb-3">ISO 27001 / ISO 27701 통합 구축</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  자산 정보 평가 시 단순 체크가 아닌 실제 취약점을 매핑합니다. Standard 이상 설계 가속 체계 체결 시 기본 갯수의 호스트/서버 정밀 진단과 전문 화이트 해킹이 자동 포함되어 예산을 더블 세이브해 드립니다.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white border border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse uppercase tracking-wider">
                  KCS-AI 420
                </div>
                <Brain className="text-brand-400 mb-4" size={36} />
                <h3 className="text-lg md:text-xl font-bold mb-3">ISO 42001 (인공지능 경영시스템) 자문</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  기업 내부의 AI 데이터 학습 흐름, 미들웨어 무결성, 윤리 가이드 준수 여부를 연계 진단해 드립니다. EU AI Act 등 대외 인가 요강에 실질 대응하는 세부 자문을 업계 합리적인 수준인 시작가 1,500만원대에 제시해 신규 시장 개척의 발판을 수립합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Area */}
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16 tracking-tight">
              컨설팅 서비스 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-100 dark:border-slate-800/80 rounded-xl overflow-hidden hover:border-brand-400 transition-colors bg-slate-50/40 dark:bg-slate-900/20"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                  >
                    <span>Q. {faq.q}</span>
                    <ChevronRight
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 bg-white dark:bg-slate-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Interactive CTA Banner */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-black text-white relative overflow-hidden text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(59,130,246,0.15),transparent_60%)]"></div>
          <div className="max-w-4xl mx-auto relative z-10 select-none">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              성공적인 보안인증의 지름길, <br />
              지체 없이 편하게 소통하십시오.
            </h2>
            <p className="text-xs md:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              로뎀의 노하우가 집약된 100종의 지침 체계와 든든한 화이트해커팀의 케어가 있다면, <br />
              아무리 까다로운 대내외 컴플라이언스 기준도 쉽고 쾌적하게 안착 가동됩니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/checklist"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 hover:scale-102 font-bold text-sm transition-all shadow-md w-full sm:w-auto cursor-pointer"
              >
                자가 보안 체크리스트 문진
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/inquiries"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white hover:bg-brand-500 hover:scale-102 font-bold text-sm transition-all shadow-md w-full sm:w-auto cursor-pointer"
              >
                지정 전문가 상담 요청 개설
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
