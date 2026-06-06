import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Award, 
  Layers, 
  CheckCircle, 
  Users, 
  ShieldAlert, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  Printer, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  ListFilter,
  CheckCircle2,
  FileCheck2,
  BookmarkCheck,
  Building2,
  Search,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function BrochurePage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<number>(1);
  const [showAllInOne, setShowAllInOne] = useState<boolean>(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Deliverables data
  const deliverables = [
    { stage: 'P1. 환경분석', name: '사업수행계획서 및 착수보고서', format: 'PDF / HWP 전자파일', desc: '사업 범위 및 구체적인 단계별 추진 일정을 명시한 착수 보고 서류' },
    { stage: 'P1. 환경분석', name: 'ISO 통합 인증 범위 정의서', format: 'PDF / PPT 전자파일', desc: '조직의 시스템 경계, 도메인 및 제외 항목의 비즈니스적 뼈대 확정' },
    { stage: 'P2. 위험관리', name: '정보자산 목록표 및 보호등급 정의서', format: 'Excel 전자파일', desc: '자산의 식별, 소유자 지정, 비즈니스 영향 분석(BIA)에 따른 자산가치 산정' },
    { stage: 'P2. 위험관리', name: '기술 취약점 진단 및 웹 모의해킹 결과 보고서', format: 'PDF 보안보고서', desc: 'Unix, Windows, 네트워크 장비, 정보보호시스템, 웹 애플리케이션 모의침투 진단 보고' },
    { stage: 'P2. 위험관리', name: '위험 분석·평가 및 처리 결과 보고서', format: 'Excel / PDF', desc: ' DoA(위험수용수준) 산정기준 및 위협 시나리오별 위험처리방안(RTP) 도출' },
    { stage: 'P3. 체계구현', name: '정보보호 및 개인정보/AI 통합 전사 규정집 (정책/지침/절차서)', format: 'Word / HWP 마스터', desc: '고객사 실제 비즈니스 모델에 맞춰 완전히 커스터마이징된 전사 보안 규정체계' },
    { stage: 'P3. 체계구현', name: '적용성(SoA: Statement of Applicability) 보고서', format: 'PDF 전사의결서', desc: '통제항목 매핑 및 제외 사유에 대한 명확한 조직적/기술적 정당성 명시' },
    { stage: 'P3. 체계구현', name: '전 임직원 보안 및 AI 윤리 인식 제고 교육 자료', format: 'PPT / PDF 교육용', desc: '임직원 인적 통제 및 인식 제고 교육 이행 수료 연동 증적' },
    { stage: 'P4. 사후관리', name: '내부 심사 결과 보고서 및 조치 계획서', format: 'PDF 내부점검 보고', desc: '심사원 시각에서 사전에 도출된 미비점에 대한 Gap 분석 및 보완조치 명세' },
    { stage: 'P4. 사후관리', name: '사업 완료 보고서 및 인증 심사 조치 계획서', format: 'PDF 최종제출서', desc: '본 심사 수검 현장 지원 및 부적합 사항에 대한 즉각적 시정완료 증적 패키지' },
  ];

  const [deliverableFilter, setDeliverableFilter] = useState<string>('all');
  const filteredDeliverables = deliverableFilter === 'all' 
    ? deliverables 
    : deliverables.filter(d => d.stage.includes(deliverableFilter));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100 pb-0">
      <SEO 
        title="프리미엄 통합 인증 컨설팅 마스터 소개서 | 로뎀시스템" 
        description="로뎀시스템만의 특급 컨설턴트 2인 전담 투입, 철저한 사내 예비심사 QA 방법론, 최신 ISO 27001:2022 / ISO 27701:2025 / ISO 42001:2023 완벽 가이드."
      />
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-500 to-black pt-28 pb-16 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-100 text-xs font-bold mb-6">
            <Award size={14} className="text-brand-400" />
            <span>ROTHEM SYSTEM PREMIUM MASTER PROPOSAL</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            프리미엄 통합 인증 컨설팅 <br/>
            <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">마스터 소개서 및 가이드</span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto font-medium mb-8">
            특급 전담 인력, 빈틈없는 내부 사전 QA, 전용 기술 취약점 툴셋 지원까지. <br className="hidden sm:inline" />
            글로벌 시장과 기관이 신뢰하는 완벽한 보안 거버넌스 로드맵을 선사합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => { setShowAllInOne(!showAllInOne); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
                showAllInOne 
                  ? 'bg-white text-slate-900 hover:bg-slate-100' 
                  : 'bg-brand-400/20 text-white border border-brand-400/30 hover:bg-brand-400/30'
              }`}
            >
              <FileText size={16} />
              {showAllInOne ? "1페이지씩 인터랙티브 보기" : "전체 순차 보고서 양식 보기"}
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/20 text-teal-300 font-bold text-sm transition-all"
            >
              <Printer size={16} />
              인쇄 및 가이드 저장 (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toggle Page Buttons (Visible if not in All-in-one view) */}
        {!showAllInOne && (
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm max-w-3xl mx-auto mb-12 gap-1">
            <button
              onClick={() => setActivePage(1)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all ${
                activePage === 1 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">1</span>
              <span>프리미엄 인증 컨설팅 개요</span>
            </button>
            <button
              onClick={() => setActivePage(2)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all ${
                activePage === 2 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">2</span>
              <span>인증 규격 요약 가이드</span>
            </button>
            <button
              onClick={() => setActivePage(3)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all ${
                activePage === 3 
                  ? 'bg-brand-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">3</span>
              <span>AI 경영시스템 & 핵심 산출물</span>
            </button>
          </div>
        )}

        {/* PRINTABLE AREA CONTAINER */}
        <div ref={printAreaRef} id="brochure-print-section" className="space-y-16">
          
          {/* ==================== PAGE 1 ==================== */}
          {(showAllInOne || activePage === 1) && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden print:border-none print:shadow-none"
            >
              {/* Cover Banner */}
              <div className="bg-gradient-to-r from-brand-800 to-brand-500 p-8 md:p-12 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Shield size={160} />
                </div>
                <div className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-2">PAGE 01 / SECTION 01</div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                  로뎀시스템 프리미엄 통합 인증 컨설팅 개요
                </h2>
                <p className="text-brand-100 max-w-3xl text-sm md:text-base leading-relaxed font-light">
                  "글로벌 시장에서 가장 확실한 신뢰와 경쟁력, 로뎀시스템이 기업의 가장 강력한 자산을 만들어 드립니다."<br/>
                  고도화되는 사이버 위협과 엄격해지는 개인정보 법규, 그리고 AI 거버넌스 시대까지 단순한 기술적 보안을 넘어 종합적인 '경영시스템 표준'을 제공합니다.
                </p>
              </div>

              {/* Core Strength Cards */}
              <div className="p-6 md:p-10 space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-l-4 border-brand-500 pl-3 mb-6">
                    💎 왜 '로뎀시스템'과 함께해야 하는가? (우리만의 특장점)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white mb-2">검증된 정예 전문가 집단 투입</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          이론만 아는 컨설턴트가 아닙니다. 본 사업에는 실제 정보보호 및 개인정보보호 분야에서 풍부한 현장 실무 경험을 책임진 <strong>'특급 컨설턴트 2인'이 고정 전담 배정</strong>되어 고객사 환경을 통째로 밀착 마크하고 리드합니다.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                        <Award size={24} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white mb-2">철저한 품질보증 (QA) 방법론</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          단순 양식 복사가 아닌 자체 프리미엄 검토 프로세스를 진행합니다. 로뎀시스템의 사내 수석 심사 위원들이 구축 과정 전반에 걸쳐 <strong>자체 품질 평가 및 실제와 동일한 '사내 예비 심사'를 사전에 시행</strong>하여 탈락 리스크를 절대 용납하지 않습니다.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                        <Lock size={24} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white mb-2">철저한 보안 관리 및 사고 ZERO화</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          컨설팅 기간 동안 취급되는 고객사 주요 자산 누출 방지를 위해 전담 인력의 서약 보증 및 이중 암호화 보조 기억 매체 활용을 의무화합니다. 물리/관리/통신까지 아우르는 <strong>3중 통제망 가이드 라인</strong> 상에서 안전하게 사업을 이행합니다.
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white mb-2">비즈니스 맞춤형 KPI 연동 설계</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          심사 획득을 위한 형식적인 인쇄용 산출물을 지양합니다. 고객의 내부 경영 시스템 및 운용 환경 특성을 철저히 반영하여 실제 작동 가능한 <strong>'보안 운용 KPI 지표' 및 '주기적 평가지표'</strong>를 제공하여 효율성을 높여 드립니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Methodology P4 */}
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-l-4 border-brand-500 pl-3 mb-8">
                    🛠️ 성공을 보장하는 로뎀시스템 4단계(P4) 컨설팅 방법론
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {/* Line Connector for larger screens */}
                    <div className="hidden lg:block absolute top-10 left-8 right-8 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 z-0 opacity-20"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-brand-500/10 shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-brand-500 text-white font-extrabold text-sm mb-4 ring-4 ring-brand-500/10">
                          P1
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">환경 분석 <span className="text-slate-400 font-normal">(Environment Analysis)</span></h4>
                        <ul className="text-slate-500 dark:text-slate-400 text-xs space-y-2 list-disc pl-4 mt-3">
                          <li>인증 대상 범위 및 서비스 식별</li>
                          <li>대내외 법규 요건 및 Gap 분석</li>
                          <li>WBS 상세 수행 일자 설계 및 공유</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-brand-500/10 shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-brand-500 text-white font-extrabold text-sm mb-4 ring-4 ring-brand-500/10">
                          P2
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">위험 관리 <span className="text-slate-400 font-normal">(Risk Assessment)</span></h4>
                        <ul className="text-slate-500 dark:text-slate-400 text-xs space-y-2 list-disc pl-4 mt-3">
                          <li>유무형 정보 자산 식별 및 가치 산정</li>
                          <li>전문 툴셋 기반 기술 취약점 전밀 진단</li>
                          <li>시나리오별 위험 평가 및 RTP 도출</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-brand-500/10 shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-brand-500 text-white font-extrabold text-sm mb-4 ring-4 ring-brand-500/10">
                          P3
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">체계 구현 <span className="text-slate-400 font-normal">(Implementation)</span></h4>
                        <ul className="text-slate-500 dark:text-slate-400 text-xs space-y-2 list-disc pl-4 mt-3">
                          <li>전사 정보보호 정책/절차/지침 개정</li>
                          <li>SoA(적용성보고서) 명확화 개정</li>
                          <li>모의 침투 및 실무 보안인식교육 시행</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative z-10 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-brand-500/10 shadow-sm hover:border-brand-500/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-brand-500 text-white font-extrabold text-sm mb-4 ring-4 ring-brand-500/10">
                          P4
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">사후 관리 <span className="text-slate-400 font-normal">(Audit Support)</span></h4>
                        <ul className="text-slate-500 dark:text-slate-400 text-xs space-y-2 list-disc pl-4 mt-3">
                          <li>최종 검증 및 심사원 맞춤 내부감사</li>
                          <li>본 인증 심사 현장 동반 대응 수검</li>
                          <li>부적합 보고서 즉시 시정보고 연동</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PAGE 2 ==================== */}
          {(showAllInOne || activePage === 2) && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden print:border-none print:shadow-none"
            >
              <div className="bg-gradient-to-r from-brand-800 to-teal-900 p-8 md:p-12 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Layers size={160} />
                </div>
                <div className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-2">PAGE 02 / SECTION 02</div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                  정보보호 및 개인정보보호 인증 규격 요약
                </h2>
                <p className="text-brand-100 max-w-3xl text-sm md:text-base leading-relaxed font-light">
                  국제 표준 규격들이 요구하는 고도의 관리체계를 완벽 분석하고 전사 조직에 안전하게 이식합니다. <br/>
                  로뎀시스템은 기업에 최적화된 마스터 가이드를 통해 신속하고 탈락 없는 인증 패스를 보증합니다.
                </p>
              </div>

              <div className="p-6 md:p-10 space-y-12">
                
                {/* 1. ISO/IEC 27001:2022 */}
                <div className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 productive-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-500 dark:text-indigo-400 flex items-center justify-center font-black">
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white">ISO/IEC 27001:2022 (정보보호 경영시스템)</h4>
                        <p className="text-slate-500 text-xs">글로벌 시장 진출 및 파트너 신뢰를 이끄는 핵심 국가/국제 보안 지표</p>
                      </div>
                    </div>
                    <span className="self-start md:self-auto px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-bold rounded-full">국제 표준 규격</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    글로벌 시장 진출 및 대기업 비즈니스를 위한 필수적인 국제 표준 정보보호 관리체계입니다. 정보보호 위험관리를 통한 비즈니스 안정성이 제고되며, 침해사고나 집단소송 발생 시 사회적·경제적 법적 피책 리스크와 피해를 최소화합니다.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <div className="font-extrabold text-indigo-500 dark:text-indigo-400 text-2xl mb-1">37개</div>
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-bold">조직 통제</div>
                      <div className="text-[10px] text-slate-400 mt-1">위협 정보, 클라우드 이용</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <div className="font-extrabold text-teal-500 dark:text-teal-400 text-2xl mb-1">8개</div>
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-bold">인적 통제</div>
                      <div className="text-[10px] text-slate-400 mt-1">채용/퇴사, 보안 교육</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <div className="font-extrabold text-amber-500 dark:text-amber-400 text-2xl mb-1">14개</div>
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-bold">물리적 통제</div>
                      <div className="text-[10px] text-slate-400 mt-1">보안 구역, 모니터링</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <div className="font-extrabold text-rose-500 dark:text-rose-400 text-2xl mb-1">34개</div>
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-bold">기술적 통제</div>
                      <div className="text-[10px] text-slate-400 mt-1">구성 관리, DLP, 시큐어코딩</div>
                    </div>
                  </div>

                  {/* Highlights box: Technical vulnerability diagnostics */}
                  <div className="p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/30">
                    <h5 className="font-extrabold text-indigo-900 dark:text-indigo-300 text-sm mb-3 flex items-center gap-1.5">
                      <ShieldAlert size={16} className="text-indigo-500" />
                      로뎀시스템만의 기술적 진단 차별점 (정밀 취약점 진단 점검 항목)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      단순 서류 검토를 완벽히 배제합니다. 로뎀시스템은 실제 보안 전문가용 진단 쉘 스크립트 도구를 마스터 배포하여 시스템 전반 취약점을 입체적 전수 조사합니다.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/45 text-center">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1">Unix/Linux 서버</span>
                        <strong className="text-xs text-slate-800 dark:text-slate-200">73개 항목 진단</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/45 text-center">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1">Windows 서버</span>
                        <strong className="text-xs text-slate-800 dark:text-slate-200">82개 항목 진단</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/45 text-center">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1">네트워크 장비</span>
                        <strong className="text-xs text-slate-800 dark:text-slate-200">38개 항목 진단</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/45 text-center">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1">정보보호시스템</span>
                        <strong className="text-xs text-slate-800 dark:text-slate-200">26개 항목 진단</strong>
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200/45 col-span-2 sm:col-span-1 text-center">
                        <span className="block text-[10px] text-slate-400 font-bold mb-1">Web Applicaton</span>
                        <strong className="text-xs text-slate-800 dark:text-slate-200">28개 모의침투</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. ISO/IEC 27701:2025 */}
                <div className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 productive-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-500 dark:text-teal-400 flex items-center justify-center font-black">
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white">ISO/IEC 27701:2025 최신 개정판 (개인정보보호 경영시스템)</h4>
                        <p className="text-slate-500 text-xs">GDPR 대응 및 개인정보 라이프사이클 통제 최고 권위의 이식 가이드라인</p>
                      </div>
                    </div>
                    <span className="self-start md:self-auto px-3 py-1 bg-teal-500/10 text-teal-500 text-xs font-bold rounded-full">2025 최신 규격 반영</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    유럽 GDPR, 국내 개인정보보호법 등 전 세계 규제 당국의 강력한 법규를 준수하기 위한 최고 권위의 개인정보 보호 표준입니다. 이번 <strong>2025년 최신 개정판(제2판)의 '독립형 관리체계(Stand-alone)' 모델 및 최신 프레임웍을 업계 최초로 완벽 반영</strong>하여 정교한 컨설팅을 수행합니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        수집 및 처리 조건 준수
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed pl-3">
                        명확한 개인정보 처리 목적 정립 및 식별 문서화, 수집 대상별 동의서 검토 및 체계적인 이력 관리 통제 수렴
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        정보주체 권리 보장 체계
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed pl-3">
                        정보주체 권리 변경 철회 메커니즘 제공, 데이터 열람·삭제(A.1.3.7) 및 휴대 제공 이행 프로세스 수립
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        설계에 의한 프라이버시 (PbD)
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed pl-3">
                        개인정보 수집최소화(A.1.4.5), 임시 파일 및 세션 소멸자, 대리 마스킹, 비식별화 연동 알고리즘 반영
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        제3자 공개 및 이전 통제
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed pl-3">
                        위탁/재수탁 계약서의 기술적·관리적 요건 검토, 국외 이전 요건 식별(A.1.5.2)과 통제 모니터링
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ==================== PAGE 3 ==================== */}
          {(showAllInOne || activePage === 3) && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden print:border-none print:shadow-none"
            >
              <div className="bg-gradient-to-r from-slate-900 to-brand-800 p-8 md:p-12 text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu size={160} />
                </div>
                <div className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-2">PAGE 03 / SECTION 03</div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
                  인공지능 경영시스템 및 마스터 산출물
                </h2>
                <p className="text-brand-100 max-w-3xl text-sm md:text-base leading-relaxed font-light">
                  생성형 AI 시대의 새로운 보안 프론티어. 인공지능 윤리와 위협 통제 시스템을 기업에 이식하는 ISO 42001 가이드부터 <br className="hidden sm:inline" />
                  심사를 한 번에 통과시키는 빈틈없는 실사 마스터 레포트 목록을 공개합니다.
                </p>
              </div>

              <div className="p-6 md:p-10 space-y-12">
                
                {/* 3. ISO/IEC 42001:2023 */}
                <div className="p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 productive-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-black">
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white">ISO/IEC 42001:2023 (인공지능 경영시스템)</h4>
                        <p className="text-slate-500 text-xs">세계 최초 AI 거버넌스 및 신뢰할 수 있는 개발/공급 수명주기 프로세스 정립</p>
                      </div>
                    </div>
                    <span className="self-start md:self-auto px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">AI 거버넌스 표준</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    인공지능(AI) 시스템을 개발, 공급 또는 도입하려는 혁신 기업이 반드시 갖춰야 할 세계 최초의 AI 거버넌스 및 리스크 가이드라인입니다. 최고 경영자 직속의 책임 체계 구축 및 지속가능한 인공지능 통제 기준을 제공합니다.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-bold text-brand-500 text-sm mb-3 flex items-center gap-1">
                        <CheckCircle size={15} /> Clause 1 ~ 10 핵심 요구사항 (AIMS)
                      </h5>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                        <li>조직 내외부 AI 유즈케이스 식별 및 이해관계자 요구 검토</li>
                        <li>생성형 AI의 왜곡/환각, 사회적 편향성 검토 윤리 방침 수립</li>
                        <li><strong>AI 시스템 영향평가 (AIIA: AI System Impact Assessment)</strong> 주기적 실행</li>
                        <li>모델 라이프사이클 관리 및 프로세싱 품질 관리 체계 수립</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold text-brand-500 text-sm mb-3 flex items-center gap-1">
                        <CheckCircle size={15} /> Annex A 핵심 통제항목 보증
                      </h5>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                        <li>AI 전용 컴퓨팅 파워, 리소스, 데이터셋 명확한 카테고리 자산화</li>
                        <li>학습용 원본 데이터의 불법 수집 및 저작권 침해 권리 요건 방어</li>
                        <li>프롬프트 인젝션(Prompt Injection), 탈옥(Jailbreak), 독성 입력 진단</li>
                        <li>외부 파트너 및 API 연동 과정에서의 연쇄 보안 책임 한계 보증</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 📂 Deliverables Table */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-l-4 border-brand-500 pl-3">
                        📂 컨설팅 완료 시 기업이 확보하게 되는 핵심 산출물 목록
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 pl-4">심사원 대응 및 기술적 이행력을 완벽 입증가능하도록 로뎀시스템이 일괄 생성 제공하는 마스터 패키지 리스트</p>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                      <ListFilter size={14} className="text-slate-400" />
                      <select 
                        value={deliverableFilter}
                        onChange={(e) => setDeliverableFilter(e.target.value)}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 outline-none"
                      >
                        <option value="all">전체 산출물 보기</option>
                        <option value="P1">P1. 환경분석 (2종)</option>
                        <option value="P2">P2. 위험관리 (3종)</option>
                        <option value="P3">P3. 체계구현 (3종)</option>
                        <option value="P4">P4. 사후관리 (2종)</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200/60 dark:border-slate-700/60">
                          <th className="p-4 w-28">수행 단계</th>
                          <th className="p-4 w-64">최종 산출물 명칭 (Deliverables)</th>
                          <th className="p-4 w-36">전달 형식 및 비고</th>
                          <th className="p-4">주요 이행 보증 목적 및 역할</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredDeliverables.map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="p-4">
                              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-extrabold text-slate-600 dark:text-slate-300">
                                {item.stage}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">
                              {item.format}
                            </td>
                            <td className="p-4 text-slate-500 dark:text-slate-400">
                              {item.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Direct Action Consultation Inquiry Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-teal-500/10 to-brand-500/10 border border-brand-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white mb-1">우리 기업에 어떤 인증이 실질적으로 요망될까요?</h4>
                      <p className="text-slate-500 text-xs max-w-xl">
                        로뎀시스템의 특급 보안 기술 자문단이 직접 회사의 인프라 환경을 진단하고, 맞춤 식별 로드맵(무료 1회 현장 방문 설명회)을 기획 제시해 드립니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 flex-shrink-0">
                    <Link 
                      to="/inquiries"
                      className="inline-flex items-center gap-1 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      <span>무료 진단 & 상세 문의기안</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ==================== FOOTER CONTACT BANNER ==================== */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl build-banner print:hidden">
            <div className="absolute inset-0 bg-brand-500/5 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-505/10 to-transparent"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-widest block mb-4">DIRECT CONTACT SERVICE</span>
              <h3 className="text-xl md:text-3xl font-black mb-6">"어려운 국제 보안 규격, 이제 로뎀시스템 특급 파트너의 손을 빌려 한 번에 통과하십시오."</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-400/10 text-teal-300 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-bold">상담 직통 (박배영 기술고문)</span>
                    <strong className="text-sm text-teal-200">010-7410-0003</strong>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4">
                  <div className="w-10 h-10 rounded-full bg-teal-400/10 text-teal-300 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-bold">공식 이메일 기획서 회신</span>
                    <strong className="text-sm text-teal-200">paeyoungpark@gmail.com</strong>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link
                  to="/inquiries"
                  className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <MessageSquare size={16} />
                  통합 온라인 견적 신청
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-sm transition-all"
                >
                  홈으로 이동
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
