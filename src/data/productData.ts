export const productData: Record<string, Record<string, any>> = {
  ko: {
    "esafeai": {
      title: "eSafeAI (생성형 AI 보안 게이트웨이)",
      subtitle: "생산성과 보안을 동시에 잡는 단 하나의 생성형 AI 보안 솔루션",
      overview: "LLM(ChatGPT, Claude 등) 사용 시 발생할 수 있는 민감정보, 개인정보 등의 유출을 원천 차단하고 기업의 AI 거버넌스를 확보하는 생성형 AI 전용 보안 게이트웨이입니다. 국가망 보안체계(N2SF) 및 AI 기본법 기준을 충족합니다.",
      aiEmphasis: "AI 활용을 차단하는 것이 아니라 '안전하게 사용'할 수 있도록 지원합니다. 프롬프트 및 첨부파일 내 민감 데이터를 실시간으로 마스킹/차단하여 AI 도입에 따른 정보유출 리스크를 완전히 해소합니다.",
      features: [
        { title: "DLP 엔진 기반 정밀 필터링", desc: "네트워크 DLP 엔진 기반으로 주민번호, 전화번호, 기업 주요 키워드를 자동 식별하여 유출을 통제합니다." },
        { title: "멀티 LLM 통합 관리", desc: "ChatGPT, Claude, Gemini 등 다양한 모델을 한 화면에서 제어하며, 토큰 사용량과 비용을 통제합니다." },
        { title: "첨부파일 심층 분석 및 OCR", desc: "100여 종 이상의 파일 내 텍스트 추출, 다층 압축 분석은 물론, 이미지 속 텍스트(OCR) 유출까지 탐지합니다." },
        { title: "강력한 가시성 및 모니터링", desc: "사용자별, 부서별 질문 프롬프트 내역과 보안 위반 알림을 대시보드로 구성하여 사후 감사에 완벽히 대응합니다." }
      ]
    },
    "ewalker-waf": {
      title: "eWalker WAF (차세대 웹방화벽)",
      subtitle: "신뢰성을 검증받은 고성능 웹 전용 방어 솔루션",
      overview: "다양한 웹 공격(OWASP Top 10) 및 어플리케이션 취약점 탐지/차단을 통해 안전한 무중단 웹 서비스를 보장합니다.",
      features: [
        { title: "논리적 방어 및 정량적 탐지", desc: "Score 기반의 정량적 위험 지수 제공 및 Anti Web DoS 등 최신 공격에 대한 보안위협 사전 방어." },
        { title: "TST 기반 고성능 세션 처리", desc: "TCP Session Transparency 기반 기술로 트래픽 폭주 시에도 성능 저하 없는 안정적인 Throughput 보장." },
        { title: "최신 프로토콜 지원", desc: "HTTP/2.0 및 TLS v1.3 환경 지원, 다양한 인증서 유형(PKCS, JKS 등) 변환 및 복호화 트래픽 가시성 제공." },
        { title: "SSL 트래픽 복호화 연동", desc: "암호화된 웹 트래픽을 복호화하여 타 보안 장비(IPS, DLP)에 전송함으로써 통합적인 보안 가시성을 확보합니다." }
      ]
    },
    "ewalker-ssg": {
      title: "eWalker SSG (SaaS 보안 게이트웨이)",
      subtitle: "망 분리 개선안에 따른 안전한 업무용 SaaS 이용 보안통제",
      overview: "물리적 망 분리 완화 및 다층보안체계(MLS, N2SF) 도입에 맞춰 클라우드 환경에서 업무용 SaaS(Office365, Dooray 등)를 안전하게 이용할 수 있도록 접속 통제 및 데이터 유출을 방지합니다.",
      features: [
        { title: "화이트리스트 기반 SaaS 제어", desc: "허용된 서비스 외의 무분별한 사이트 트래픽 차단, 사용자 접근 통제 강화." },
        { title: "SaaS 사용 세부 로그 및 차단", desc: "SaaS 접근 시 웹페이지 내 IP/PASSWD 인증, 첨부파일 타입 기반 로깅 및 차단 지원." },
        { title: "SSL 암복호화 지원", desc: "비대칭 환경(Active-Active) 복호화 및 우회접속(Tor, Proxy) 차단." },
        { title: "인사 DB 동기화", desc: "고객사 인사 정보와 연동하여 그룹/직급별 세분화된 접근 권한 정책 부여." }
      ]
    },
    "ewalker-swg": {
      title: "eWalker SWG (통합 인터넷 접속관리)",
      subtitle: "인터넷 유해사이트 차단 및 비업무 사이트 제어 솔루션",
      overview: "직원들의 비업무적 인터넷 사용(P2P, 도박, 주식 등)을 통제하여 업무 생산성을 높이고, 악성코드 배포 사이트 접속을 원천 차단하여 기업 네트워크 자원을 보호합니다.",
      features: [
        { title: "국내 최대 URL DB 구축", desc: "사이트 평판, 방송통신심의위원회, KISA 제공 등 검증된 국내 최대 유해/비업무 URL DB 제공." },
        { title: "악성 트래픽 방어", desc: "랜섬웨어 유포지 접점 1차 차단, 인증되지 않은 외부망 다운로드 금지." },
        { title: "우회 접속 툴 차단", desc: "ZenMate, Tor 등 암호화 트래픽 우회 접속 시도 탐지 및 차단(SSL 가시성 특화)." },
        { title: "정교한 정책 관리", desc: "부서/개인별 접속 정책 차등 적용 및 예외 사이트 차단 해제 승인 워크플로우 적용." }
      ]
    },
    "ewalker-dlp": {
      title: "eWalker DLP (네트워크 정보유출 방지)",
      subtitle: "기업 내부 핵심 정보의 투명한 흐름 모니터링",
      overview: "네트워크 상에서 이메일, 메신저, 클라우드 저장소를 통해 발생할 수 있는 내부 중요 데이터 및 개인정보 유출 시도를 실시간으로 탐지하고 차단합니다.",
      features: [
        { title: "정밀한 개인정보 식별", desc: "주민등록번호, 여권번호, 금융정보 및 사내 기밀 키워드를 정규식으로 복합 탐지." },
        { title: "다양한 유출 채널 커버리지", desc: "웹 메일, 상용 메신저, 블로그 및 SNS 등 광범위한 인터넷 애플리케이션 프로토콜 통제." },
        { title: "첨부파일 심층 검사", desc: "암호화 문서, 압축 파일 내부, 파일 매직바이트를 통한 우회 확장자(확장자 변조) 차단." },
        { title: "감사 및 컴플라이언스", desc: "유출 사고 발생 전/후의 상세 로그(원본 저장) 기록 보존으로 강력한 감사 체계 제공." }
      ]
    }
  },
  en: {
    "esafeai": {
      title: "eSafeAI (Generative AI Security Gateway)",
      subtitle: "The ultimate solution for productivity and AI security",
      overview: "A dedicated Generative AI security gateway that blocks the leakage of sensitive data (PII, corporate secrets) when using LLMs (ChatGPT, Claude, etc.) and ensures AI governance.",
      aiEmphasis: "Rather than blocking AI, it enables 'Secure AI Usage'. It mitigates risks by masking or blocking sensitive data dynamically before it reaches external LLMs.",
      features: [
        { title: "DLP Engine-based Filtering", desc: "Network DLP engine automatically identifies and controls the flow of SSNs, phone numbers, and corporate keywords." },
        { title: "Unified Multi-LLM Control", desc: "Control ChatGPT, Claude, Gemini from a single console while managing token usage and budget limits." },
        { title: "Deep Attachment Analysis & OCR", desc: "Parses over 100 file types, deeply compresses files, and utilizes OCR to detect leaks within images." },
        { title: "Visibility & Monitoring", desc: "Provides dashboards for prompt histories per user/department and alerts for security violations to support post-audit." }
      ]
    },
    "ewalker-waf": {
      title: "eWalker WAF (Next-Gen Web Application Firewall)",
      subtitle: "Highly reliable, high-performance web defense",
      overview: "Secures uninterrupted web services by detecting/blocking various web attacks (OWASP Top 10) and application vulnerabilities.",
      features: [
        { title: "Logical & Quantitative Defense", desc: "Provides score-based risk metrics and proactively blocks modern threats like Anti Web DoS." },
        { title: "High-Performance Session Processing", desc: "Stable throughput even during traffic spikes via TCP Session Transparency (TST)." },
        { title: "Latest Protocol Support", desc: "Supports HTTP/2.0 and TLS v1.3, handles PKCS/JKS certificates, and provides SSL visibility." },
        { title: "SSL Traffic Decryption", desc: "Decrypts traffic and forwards it to other security devices (IPS, DLP) for comprehensive visibility." }
      ]
    },
    "ewalker-ssg": {
      title: "eWalker SSG (SaaS Security Gateway)",
      subtitle: "Secure SaaS access control following network segmentation relaxation",
      overview: "Designed for cloud environments and MLS/N2SF transitions, allowing secure usage of business SaaS (Office365, Dooray) while preventing data egress.",
      features: [
        { title: "Whitelist-based SaaS Control", desc: "Blocks unwarranted web traffic except for clearly permitted SaaS portals." },
        { title: "SaaS Detailed Logs & Blocking", desc: "Supports IP/PASSWD auth, attachment-based logging, and granular block policies." },
        { title: "SSL Decryption Support", desc: "Provides active-active decryption environments and blocks proxy/Tor evasion." },
        { title: "HR DB Synchronization", desc: "Integrates with corporate HR data to apply granular policies by group or role." }
      ]
    },
    "ewalker-swg": {
      title: "eWalker SWG (Secure Web Gateway)",
      subtitle: "Total Internet access management & threat blocking",
      overview: "Prevents access to non-business sites (gambling, stock, P2P) to boost productivity, while blocking malware-distributing sites to protect internal assets.",
      features: [
        { title: "Largest URL DB in Korea", desc: "Maintains a verified DB updated consistently with partners like KISA." },
        { title: "Malicious Traffic Blocking", desc: "First-line defense against Ransomware domains and unverified downloads." },
        { title: "Evasion Tool Blocking", desc: "Detects and blocks encrypted bypass proxies like ZenMate or Tor." },
        { title: "Sophisticated Policy Management", desc: "Allows department/individual policy differentiation and dynamic exception approvals." }
      ]
    },
    "ewalker-dlp": {
      title: "eWalker DLP (Network Data Loss Prevention)",
      subtitle: "Transparent monitoring of core enterprise data flows",
      overview: "Monitors network traffic in real-time to detect and block the exfiltration of important data or PII via email, messengers, or cloud storage.",
      features: [
        { title: "Precise PII Identification", desc: "Detects structured data (SSN, credit cards) and complex regular expressions for corporate secrets." },
        { title: "Broad Channel Coverage", desc: "Controls extensive web protocols including Webmail, mass messengers, and social media." },
        { title: "Deep File Inspection", desc: "Blocks evasion via modified extensions using Magic Byte analysis and deep parsing." },
        { title: "Audit & Compliance", desc: "Maintains robust records and original data snippets to handle post-incident forensics." }
      ]
    }
  }
};
