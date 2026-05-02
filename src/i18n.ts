import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      "nav": {
        "about": "회사소개",
        "services": "사업영역",
        "contact": "문의안내",
        "profile": "CEO 프로필",
        "products": "보안 솔루션",
        "login": "로그인",
        "logout": "로그아웃"
      },
      "hero": {
        "badge": "Trust, Security, Intelligence",
        "title1": "AI 시대를 선도하는",
        "title2": "정보보호 및 거번넌스 파트너",
        "company": "주식회사 로뎀시스템",
        "desc": "고객의 소중한 디지털 자산을 안전하게 보호하여 신뢰할 수 있는 비즈니스 환경을 제공합니다.",
        "btn_about": "회사 소개 보기",
        "btn_contact": "문의하기"
      },
      "about": {
        "title": "회사 소개",
        "subtitle": "비전 및 핵심 가치",
        "card1_title": "Digital Trust",
        "card1_desc": "고객의 소중한 디지털 자산을 안전하게 보호하여 신뢰할 수 있는 비즈니스 환경을 제공합니다.",
        "card2_title": "AI Innovation",
        "card2_desc": "인공지능 기술의 윤리적이고 안전한 도입을 위한 거버넌스 체계를 수립하고 선도합니다.",
        "card3_title": "Partnership",
        "card3_desc": "고객과 함께 성장하며 지속 가능한 IT 생태계를 만들어가는 든든한 파트너가 되겠습니다."
      },
      "services": {
        "title": "사업 영역",
        "subtitle": "글로벌 수준의 정보보호 및 AI 경영시스템 구축을 위한 최고의 전문성을 보유하고 있습니다.",
        "s1_title": "정보보호 경영시스템 (ISO 27001)",
        "s1_desc": "기업의 정보자산을 내/외부 위협으로부터 안전하게 보호하기 위한 국제 표준 기반 최적의 정보보호 관리체계 수립 및 인증 지원.",
        "s2_title": "개인정보보호 경영시스템 (ISO 27701)",
        "s2_desc": "국내외 프라이버시 규제 대응 및 안전한 개인정보 처리를 위한 글로벌 수준의 개인정보보호 체계 구축.",
        "s3_title": "클라우드 보안 경영시스템 (ISO 27017)",
        "s3_desc": "안전하고 신뢰할 수 있는 클라우드 서비스 제공 및 이용을 위한 맞춤형 클라우드 정보보호 가이드라인 적용.",
        "s4_title": "인공지능 경영시스템 (ISO 42001)",
        "s4_desc": "AI 시스템의 안전성, 투명성, 신뢰성을 확보하고 AI 기술을 책임감 있게 관리하기 위한 글로벌 표준 인증.",
        "s5_title": "자동차 정보보안 평가 (TISAX)",
        "s5_desc": "독일 자동차 산업 협회(VDA) 기준의 글로벌 자동차 공급망 전반에 걸친 정보보안 평가 체계 수립 및 대응.",
        "s6_title": "정보보호 및 개인정보 관리체계 (ISMS-P)",
        "s6_desc": "국내 최고 수준의 종합 관리체계 인증을 위한 취약점 진단, 현황 분석, 대책 수립 및 인증 통합 지원."
      },
      "contact": {
        "title": "오시는 길 및 문의",
        "subtitle": "로뎀시스템과 함께 새로운 비즈니스 가치를 창출하세요.",
        "address_label": "본사 위치",
        "address": "대구시 동구 율하동로 23길",
        "phone_label": "대표 전화",
        "phone_val": "053-964-3033",
        "email_label": "이메일",
        "email_val": "rothem@rothemsystem.com",
        "form_title": "프로젝트 문의하기",
        "name": "이름 / 회사명",
        "email": "연락처 및 이메일",
        "message": "문의 내용",
        "submit": "문의 보내기"
      },
      "footer": {
        "company": "주식회사 로뎀시스템",
        "address": "대구시 동구 율하동로 23길",
        "ceo": "대표이사: 박배영",
        "biz_num": "사업자등록번호: 502-86-05484",
        "tel": "TEL: 053-964-3033",
        "email": "rothem@rothemsystem.com",
        "terms": "이용약관",
        "privacy": "개인정보처리방침"
      },
      "login": {
        "title": "로그인",
        "subtitle": "로뎀시스템 파트너 포털에 오신 것을 환영합니다.",
        "btn_google": "Google 계정으로 로그인",
        "back": "홈으로 돌아가기"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "about": "About Us",
        "services": "Services",
        "contact": "Contact",
        "profile": "CEO Profile",
        "products": "Security Solutions",
        "login": "Login",
        "logout": "Logout"
      },
      "hero": {
        "badge": "Trust, Security, Intelligence",
        "title1": "Leading Information Security",
        "title2": "& Governance Partner",
        "company": "rothemsystem",
        "desc": "We provide a reliable business environment by safely protecting our customers' valuable digital assets.",
        "btn_about": "Learn More",
        "btn_contact": "Contact Us"
      },
      "about": {
        "title": "About Us",
        "subtitle": "Vision & Core Values",
        "card1_title": "Digital Trust",
        "card1_desc": "We provide a reliable business environment by safely protecting our customers' valuable digital assets.",
        "card2_title": "AI Innovation",
        "card2_desc": "Establishing and leading governance systems for the ethical and safe introduction of AI technology.",
        "card3_title": "Partnership",
        "card3_desc": "We will be a reliable partner growing together with our customers to create a sustainable IT ecosystem."
      },
      "services": {
        "title": "Our Services",
        "subtitle": "Providing global-level expertise in Information Security and AI Management Systems.",
        "s1_title": "Information Security (ISO 27001)",
        "s1_desc": "Establishing an optimal information security management system based on international standards to protect corporate assets.",
        "s2_title": "Privacy Information (ISO 27701)",
        "s2_desc": "Building a global-level privacy information management system for regulatory compliance and secure data processing.",
        "s3_title": "Cloud Security (ISO 27017)",
        "s3_desc": "Applying customized cloud information security guidelines for safe and reliable cloud services.",
        "s4_title": "AI Management System (ISO 42001)",
        "s4_desc": "Global certification to secure safety, transparency, and trust in AI systems and manage AI responsibly.",
        "s5_title": "Automotive Security (TISAX)",
        "s5_desc": "Establishing and responding to the global automotive supply chain information security assessment system based on VDA standards.",
        "s6_title": "ISMS-P Certification",
        "s6_desc": "Supporting status analysis, vulnerability assessment, and certification for Korea's comprehensive security management system."
      },
      "contact": {
        "title": "Location & Contact",
        "subtitle": "Create new business value with rothemsystem.",
        "address_label": "Head Office",
        "address": "Yulhadong-ro 23-gil, Dong-gu, Daegu, Republic of Korea",
        "phone_label": "Phone",
        "phone_val": "053-964-3033",
        "email_label": "Email",
        "email_val": "rothem@rothemsystem.com",
        "form_title": "Project Inquiry",
        "name": "Name / Company",
        "email": "Contact & Email",
        "message": "Inquiry Details",
        "submit": "Send Message"
      },
      "footer": {
        "company": "rothemsystem",
        "address": "Yulhadong-ro 23-gil, Dong-gu, Daegu, Republic of Korea",
        "ceo": "CEO: Baeyoung Park",
        "biz_num": "Business No.: 502-86-05484",
        "tel": "TEL: 053-964-3033",
        "email": "rothem@rothemsystem.com",
        "terms": "Terms of Use",
        "privacy": "Privacy Policy"
      },
      "login": {
        "title": "Login",
        "subtitle": "Welcome to rothemsystem Partner Portal",
        "btn_google": "Sign in with Google",
        "back": "Back to Home"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko", 
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
