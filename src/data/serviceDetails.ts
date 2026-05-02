export const serviceDetailsData: Record<string, Record<string, any>> = {
  ko: {
    "iso27001": {
      title: "정보보호 경영시스템 (ISO 27001)",
      subtitle: "조직의 비즈니스 목표 지원을 통한 글로벌 시장에서 신뢰와 경쟁력 확보",
      overview: "개인정보보호 및 정보보안 경영시스템 인증을 위한 종합 컨설팅을 제공합니다. 관리적, 물리적, 기술적 보안을 모두 아우르는 국제 표준 기준 관리체계를 구축합니다.",
      sections: [
        {
          title: "주요 컨설팅 방법론",
          items: [
            "환경분석: 요구사항 분석, 자산식별, 현황 및 GAP 분석",
            "위험관리: 위협/취약점 분석 및 평가, 종합 위험도 산정, 대책 수립",
            "체계 구현: 정보보호 기반 체계 수립, 내부 임직원 보안 교육 및 모의훈련",
            "사후관리: 인증심사 신청 준비, 이행 점검 및 내부감사 수검"
          ]
        },
        {
          title: "상세 기술적 진단 체계",
          items: [
            "서버 취약점 진단: 계정 및 권한관리, 파일/디렉터리, 불필요 서비스 점검",
            "네트워크 진단: ACL 접근제어, Session Timeout, 멀티캐스트 점검",
            "정보보호시스템: 유해 트래픽 정책, 접근통제 유효성, 보안 로그 진단",
            "웹 서비스 모의해킹: OWASP 10대 취약점, 국정원 가이드 기반 인젝션/XSS 실증"
          ]
        }
      ]
    },
    "iso27701": {
      title: "개인정보보호 경영시스템 (ISO 27701)",
      subtitle: "국내외 프라이버시 규제 대응을 위한 선진 개인정보보호 체계",
      overview: "개인정보의 수집, 처리, 위탁 등 라이프사이클 전반에 걸친 글로벌 표준 인증을 지원합니다. GDPR 등 파편화된 각국의 규제 요건을 통합하여 법적 리스크를 완화합니다.",
      sections: [
        {
          title: "개인정보보호 요구사항 충족",
          items: [
            "PII Controller 및 Processor(수탁자) 역할에 따른 촘촘한 보안 통제 설계",
            "적법성 검토: 수집 목적 명확화, 동의 절차, 처리 근거 법제도 분석 (Annex A/B)",
            "Privacy by Design: 서비스 기획 단계부터 개인정보보호 내재화"
          ]
        },
        {
          title: "기대 효과",
          items: [
            "비즈니스 신뢰도 상승 및 글로벌 파트너의 개인정보 요구수준 충족",
            "데이터 유출 사고 예방 및 사고 발생 시 법적 책임 경감 근거 마련"
          ]
        }
      ]
    },
    "iso27017": {
      title: "클라우드 보안 경영시스템 (ISO 27017)",
      subtitle: "클라우드 환경에 최적화된 서비스 보안성 확보",
      overview: "조직 내 클라우드 도입 가속화에 맞춰, 클라우드 서비스 제공자(CSP) 및 이용자(CSC) 양측에서 요구되는 보안 통제를 수립하고 위험을 최소화합니다.",
      sections: [
        {
          title: "핵심 컨설팅 영역",
          items: [
            "클라우드 아키텍처 진단: 환경 구성의 안전성 및 물리적/논리적 분리 상태 평가",
            "책임 공유 모델 명확화: 제공자와 고객 간의 보안 사각지대 식별 및 보완",
            "접근 통제 강화: 강력한 권한 관리 및 유출 방지 아키텍처 설계"
          ]
        }
      ]
    },
    "iso42001": {
      title: "인공지능 경영시스템 (ISO/IEC 42001)",
      subtitle: "AI 기술을 책임감 있고 윤리적으로 관리하기 위한 체계적인 접근",
      overview: "최초 인증 단기 완성 컨설팅(3개월 WBS 기반). AI 시스템 전 생애주기 리스크를 식별하고 규제를 준수하여 이해관계자의 신뢰를 확보합니다.",
      sections: [
        {
          title: "로뎀시스템 차별화 강점",
          items: [
            "ATVR 위험관리 방법론: 자산(Asset), 위협(Threat), 취약점, 위험 기반 체계적 접근",
            "AI 자산 중심 분석: 모델 아키텍처, 학습 데이터 편향성, 알고리즘 분석",
            "최신 위협 인텔리전스: 프롬프트 인젝션, 모델 역공학, 환각 제어 방안 고려",
            "이중 평가 체계: 보안 리스크 평가와 더불어 AI 안전성/공정성/투명성 영향평가 병행"
          ]
        },
        {
          title: "단기 프로젝트 핵심 단계 (약 3개월)",
          items: [
            "Step 1(착수/분석): 범위 확정, AI 시스템 현황조사 및 규제(EU AI Act 등) GAP 분석",
            "Step 2(평가/설계): AIMS 매뉴얼/지침 작성, AI 위험 산정 및 위험 처리 계획(RTP) 수립",
            "Step 3(인증/사후): SoA(적용성보고서) 작성, 시범운영 데이터 증적, 내부/최종 심사 대응"
          ]
        }
      ]
    },
    "tisax": {
      title: "자동차 정보보안 평가 (TISAX)",
      subtitle: "유럽 자동차 산업협회 보안 표준 준수 및 공식 레이블 획득 지원",
      overview: "자동차 생산 공급망에 기여하는 파트너 및 협력사를 대상으로 독일 VDA 지정 유럽 보안평가 교환제도(TISAX) 요건에 맞는 정보보호 시스템을 구축합니다.",
      sections: [
        {
          title: "TISAX 주력 평가 영역 (Assessment Objectives)",
          items: [
            "Information Security: 높은/매우 높은 수준의 기업 주요 정보 자산 및 지적 자산 보호",
            "Prototype Protection: 물리적 통제를 통한 시제품 차량, 핵심 부품, 테스트 행사 보호",
            "Data Protection: 유럽 GDPR에 준하는 엄격한 개인 데이터 처리 보호"
          ]
        },
        {
          title: "컨설팅 및 심사 절차",
          items: [
            "1. ENX 사이트 등록 및 범위설정 (AL1 ~ AL3 등급 스코핑)",
            "2. VDA-ISA 체크리스트 기반 자가진단(현황 분석) 및 GAP 분석 도출",
            "3. 취약점 개선과제 도출, 정보보호 정책 개정 및 물리적 보안 통제(출입/네트워크) 설계",
            "4. XAP(지정 심사기관) 심사 수검 리허설 및 현장심사 대응 (중/경부적합 시정조치 포함)"
          ]
        }
      ]
    },
    "ismsp": {
      title: "ISMS-P (정보보호 및 개인정보보호 관리체계)",
      subtitle: "국내 최고 수준의 보안 컴플라이언스 통합 인증 컨설팅",
      overview: "과학기술정보통신부와 개인정보보호위원회가 공동 고시하는 국내 최고 권위의 정보보안 인증입니다. 관리체계 수립, 보호대책 요구사항, 개인정보 처리 단계별 요구사항을 빈틈없이 준비합니다.",
      sections: [
        {
          title: "주요 지원 내역",
          items: [
            "정보자산 및 개인정보 흐름도(Data Flow) 정밀 가시화",
            "102개 심사 기준에 맞춘 보호대책 및 컴플라이언스 진단 이행",
            "유출 사고 및 재난 대비 IT BCP(연속성 계획) 모의 훈련 지원",
            "방대한 인증 증적 패키징 및 의무 감리/심사 방어"
          ]
        }
      ]
    }
  },
  en: {
    "iso27001": {
      title: "Information Security Management (ISO 27001)",
      subtitle: "Securing trust and competitiveness in the global market.",
      overview: "We provide comprehensive consulting for ISMS/PIMS certifications. Establish an international standard management system encompassing administrative, physical, and technical security.",
      sections: [
        {
          title: "Core Methodology",
          items: [
            "Environment Analysis: Requirement analysis, asset identification, and GAP analysis",
            "Risk Management: Threat/vulnerability assessment, and countermeasure selection",
            "Implementation: Base system establishment, internal employee security training",
            "Post-management: Certification audit prep, and internal audit execution"
          ]
        },
        {
          title: "Technical Assessment",
          items: [
            "Server: Account/privilege, file, service, and security patch configuration",
            "Network: ACL, Session Timeout, DDoS defense settings",
            "Security systems: Harmful traffic policy, access control effectiveness",
            "Web vulnerabilities: OWASP Top 10, SQLi, XSS simulated hacking"
          ]
        }
      ]
    },
    "iso27701": {
      title: "Privacy Information Management System (ISO 27701)",
      subtitle: "Advanced privacy protection tailored for global regulations",
      overview: "Ensures compliance with international data privacy laws (e.g., GDPR) by establishing a comprehensive privacy management system across the entire data lifecycle.",
      sections: [
        {
          title: "Key compliance mechanisms",
          items: [
            "Detailed control designs for both PII Controllers and Processors",
            "Legitimacy review: clear data collection purposes and consent processes",
            "Privacy by Design: embedding privacy into the core of service architecture"
          ]
        }
      ]
    },
    "iso27017": {
      title: "Cloud Security Management (ISO 27017)",
      subtitle: "Ensuring secure cloud environments.",
      overview: "With the acceleration of enterprise cloud adoption, we establish necessary security controls for both cloud service providers and users to minimize cloud-centric risks.",
      sections: [
        {
          title: "Core Consulting Areas",
          items: [
            "Cloud architecture assessment emphasizing isolation and security perimeters",
            "Clarifying the shared responsibility model between CSPs and customers",
            "Enhancing Identity and Access Management and Data Loss Prevention limits"
          ]
        }
      ]
    },
    "iso42001": {
      title: "AI Management System (ISO/IEC 42001)",
      subtitle: "A systematic approach to responsibly and ethically manage AI technology.",
      overview: "Short-term complete consulting for initial certification (3-month WBS). Identify full AI lifecycle risks and comply with regulations to ensure stakeholder trust.",
      sections: [
        {
          title: "Rodem System's Differentiators",
          items: [
            "ATVR Risk Management: Systematic approach based on Asset, Threat, Vulnerability, and Risk",
            "AI Asset-Centric: Focus on AI models, training data, and algorithms",
            "Threat Intelligence: Mitigating Prompt Injections, Model Reverse Engineering",
            "Dual Evaluation: Security Risk Assessment + AI Trust/Safety Impact Assessment"
          ]
        },
        {
          title: "Key Project Phases (3 Months)",
          items: [
            "Month 1: Kick-off, scope definition, AI system status & GAP analysis",
            "Month 2: AIMS manuals/guidelines drafting, AI risk & impact assessments",
            "Month 3: SoA (Statement of Applicability), mock audits, and final certification"
          ]
        }
      ]
    },
    "tisax": {
      title: "Automotive Information Security (TISAX)",
      subtitle: "Consulting for European Automotive Industry Security Standard Compliance.",
      overview: "We build secure systems meeting the German VDA's European security assessment exchange (TISAX) requirements for suppliers (OEMs, parts manufacturers) in the automotive supply chain.",
      sections: [
        {
          title: "TISAX Assessment Objectives",
          items: [
            "Information Security: High / Very High level corporate information asset protection",
            "Prototype Protection: Safeguarding prototype vehicles, parts, and test events",
            "Data Protection: Privacy protection aligned with European GDPR"
          ]
        },
        {
          title: "Consulting Process",
          items: [
            "1. ENX Registration and scope setting (AL1 ~ AL3 levels)",
            "2. VDA-ISA checklist-based status and GAP analysis",
            "3. Improvement task deduction, security policy and physical control design",
            "4. XAP auditing agency response & final label acquisition support"
          ]
        }
      ]
    },
    "ismsp": {
      title: "ISMS-P Certification (Korea)",
      subtitle: "Korea's highest authority integrated security compliance.",
      overview: "The most stringent information security standard co-governed by Korean regulatory bodies. We prepare the organizational management system, protective measures, and privacy steps.",
      sections: [
        {
          title: "Support Highlights",
          items: [
            "Precise mapping of information assets and Personal Data flow",
            "Comprehensive compliance check against 102 inspection criteria",
            "IT BCP (Continuity Planning) simulations for disaster readiness",
            "Complete audit defense positioning and evidence packaging"
          ]
        }
      ]
    }
  }
};
