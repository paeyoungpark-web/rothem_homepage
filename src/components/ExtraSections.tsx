import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  Mail, 
  ArrowRight, 
  Search, 
  Building2, 
  Cpu, 
  CreditCard, 
  Plus, 
  ChevronDown, 
  Activity, 
  Briefcase, 
  CheckCircle2, 
  X,
  FileText
} from 'lucide-react';

interface ClientData {
  name: string;
  type: string;
  logoUrl?: string; // For later overriding from Firebase
}

const defaultClients: ClientData[] = [
  { name: "경상북도교육청", type: "public" },
  { name: "경북정보센터", type: "public" },
  { name: "달성군시설관리공단", type: "public" },
  { name: "대구공공시설관리공단", type: "public" },
  { name: "대구도시개발공사", type: "public" },
  { name: "구미시청", type: "public" },
  { name: "예천군청", type: "public" },
  { name: "안동시청", type: "public" },
  { name: "상주시청", type: "public" },
  { name: "영천시청", type: "public" },
  { name: "의성군청", type: "public" },
  { name: "청도군청", type: "public" },
  { name: "청송군청", type: "public" },
  { name: "영주시청", type: "public" },
  { name: "한국가스공사", type: "public" },
  { name: "한국교통안전공단", type: "public" },
  { name: "한국에너지공단", type: "public" },
  { name: "농림축산검역본부", type: "public" },
  { name: "국립종자원", type: "public" },
  { name: "한국농산물품질관리원", type: "public" },
  { name: "한국법무보호복지공단", type: "public" },
  { name: "대한법률구조공단", type: "public" },
  { name: "경북대학교병원", type: "medical" },
  { name: "한수원인재개발원", type: "public" },
  { name: "구미시립도서관", type: "public" },
  { name: "안동시시설관리공단", type: "public" },
  { name: "포항시립서도서관", type: "public" },
  { name: "영주시립도서관", type: "public" },
  { name: "구미산동도서관", type: "public" },
  { name: "동방", type: "enterprise" },
  { name: "상신브레이크", type: "enterprise" },
  { name: "엘앤에프", type: "enterprise" },
  { name: "LS메카피온", type: "enterprise" },
  { name: "인탑스", type: "enterprise" },
  { name: "대한제당", type: "enterprise" },
  { name: "대동에그테크", type: "enterprise" },
  { name: "참저축은행", type: "finance" },
  { name: "JVM", type: "enterprise" },
  { name: "SSLM", type: "enterprise" },
  { name: "굿센", type: "enterprise" },
  { name: "진양오일씰", type: "enterprise" },
  { name: "한호에코스티", type: "enterprise" },
  { name: "태림산업", type: "enterprise" },
  { name: "자이오넥스", type: "enterprise" },
  { name: "클루닉스", type: "enterprise" },
  { name: "엠씨넥스", type: "enterprise" },
  { name: "한국보건산업진흥원", type: "public" },
  { name: "한국수력원자력인재개발원", type: "public" },
  { name: "여주시설관리공단", type: "public" },
  { name: "사이버다임", type: "enterprise" }
];

const getClientIcon = (type: string) => {
  switch(type) {
    case 'public': return <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    case 'medical': return <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    case 'enterprise': return <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case 'finance': return <CreditCard className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    default: return <Briefcase className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
  }
};

const getClientTypeName = (type: string) => {
  switch(type) {
    case 'public': return '공공기관';
    case 'medical': return '의료기관';
    case 'enterprise': return '일반기업';
    case 'finance': return '금융기관';
    default: return '기타파트너';
  }
};

const getClientBadgeStyle = (type: string) => {
  switch(type) {
    case 'public': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50';
    case 'medical': return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50';
    case 'enterprise': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50';
    case 'finance': return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50';
    default: return 'bg-slate-50 text-slate-700 border-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800';
  }
};

const ClientCard: React.FC<{ client: ClientData }> = ({ client }) => (
  <div 
    className="inline-flex items-center gap-3.5 px-6 py-4 mx-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800/80 hover:shadow-md hover:border-brand-500/30 dark:hover:border-brand-400/30 transition-all duration-300 min-w-max hover:-translate-y-1 transform"
  >
    {client.logoUrl ? (
      <img 
        src={client.logoUrl} 
        alt={client.name} 
        referrerPolicy="no-referrer"
        className="h-8 md:h-9 object-contain filter grayscale contrast-125 opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
      />
    ) : (
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getClientBadgeStyle(client.type)}`}>
          {getClientIcon(client.type)}
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-100 text-base tracking-tight">{client.name}</span>
      </div>
    )}
  </div>
);

export function ClientLogoSlider() {
  const [clients, setClients] = useState<ClientData[]>(defaultClients);
  const [showCatalog, setShowCatalog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'public' | 'enterprise' | 'medical' | 'finance'>('all');

  useEffect(() => {
    async function fetchLogos() {
      try {
        const querySnapshot = await getDocs(collection(db, 'client_logos'));
        if (!querySnapshot.empty) {
          const fetchedClients = querySnapshot.docs.map(doc => doc.data() as ClientData);
          if (fetchedClients.length > 0) {
            setClients(prev => [...prev, ...fetchedClients]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch client logos", err);
        try {
          handleFirestoreError(err, OperationType.LIST, 'client_logos');
        } catch (specErr) {
          console.error("Caught spec error safely in ClientLogoSlider:", specErr);
        }
      }
    }
    fetchLogos();
  }, []);

  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  // Categorized counts for the directory dashboard
  const stats = {
    all: clients.length,
    public: clients.filter(c => c.type === 'public').length,
    enterprise: clients.filter(c => c.type === 'enterprise').length,
    medical: clients.filter(c => c.type === 'medical').length,
    finance: clients.filter(c => c.type === 'finance').length,
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || c.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="clients" className="py-24 bg-brand-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 mb-16 text-center select-none">
        <span className="px-3.5 py-1.5 bg-brand-100 dark:bg-brand-950/40 text-brand-500 dark:text-brand-300 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
          Partnership Client List
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-4">
          신뢰로 맺어진 보안 파트너
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          관공서, 중대형 기업, 의료기관 및 금융기관 등 다양한 산업군에서 검증된 로뎀시스템만의 수준 높은 보안 연계 자문을 경험하고 있습니다.
        </p>
      </div>

      {/* Infinite Marquee Slider Row 1 */}
      <div className="relative group/marquee mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee group-hover/marquee:[animation-play-state:paused] whitespace-nowrap">
          {[...row1, ...row1, ...row1].map((client, idx) => (
            <ClientCard key={`row1-${idx}`} client={client} />
          ))}
        </div>
      </div>

      {/* Infinite Marquee Slider Row 2 */}
      <div className="relative group/marquee mb-14">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee-reverse group-hover/marquee:[animation-play-state:paused] whitespace-nowrap">
          {[...row2, ...row2, ...row2].map((client, idx) => (
            <ClientCard key={`row2-${idx}`} client={client} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <button
          onClick={() => setShowCatalog(!showCatalog)}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-xl font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          {showCatalog ? '고객사 디렉토리 닫기' : '전체 고객사 리스트 검색 및 필터하기'}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCatalog ? 'rotate-185' : ''}`} />
        </button>

        {/* Dynamic Client Catalog Panel */}
        {showCatalog && (
          <div className="mt-10 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-xl text-left animate-fade-in">
            {/* Catalog Controller Header */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8 border-b border-slate-100 dark:border-slate-700/60 pb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">고객사 디렉토리 검색</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">로뎀시스템과 함께하는 주요 고객 레퍼런스를 직접 조회해 보세요.</p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="고객사명으로 조회..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>
            </div>

            {/* Categories Chips */}
            <div className="flex flex-wrap gap-2 mb-8 select-none">
              {[
                { id: 'all', label: '전체 고객사', count: stats.all },
                { id: 'public', label: '🏛️ 공공기관', count: stats.public },
                { id: 'enterprise', label: '🏭 일반기업', count: stats.enterprise },
                { id: 'medical', label: '🏥 의료기관', count: stats.medical },
                { id: 'finance', label: '🏦 금융기관', count: stats.finance }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    activeCategory === category.id
                      ? 'bg-brand-500 border-brand-500 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* Directory Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredClients.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-400">
                  <FileText className="w-10 h-10 mx-auto mb-3 opacity-60" />
                  <p className="font-bold">일치하는 고객사 또는 파트너가 없습니다.</p>
                  <p className="text-xs text-slate-400 mt-1">검색어를 다른 단어로 변경해 다시 검색해 보세요.</p>
                </div>
              ) : (
                filteredClients.map((client, idx) => (
                  <div
                    key={`catalog-${client.name}-${idx}`}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-brand-500/20 hover:shadow-xs transition-all duration-200"
                  >
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-tight truncate">{client.name}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mt-auto flex items-center gap-1.5">
                      {getClientIcon(client.type)}
                      {getClientTypeName(client.type)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const snapshot = await getDocs(collection(db, 'subscribers'));
        setCount(snapshot.size + 1500); // base count
      } catch (error) {
        console.error(error);
        try {
          handleFirestoreError(error, OperationType.LIST, 'subscribers');
        } catch (specErr) {
          console.error("Caught spec error safely in NewsletterSection:", specErr);
        }
      }
    }
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp()
      });
      alert('구독이 완료되었습니다!');
      setEmail('');
      setCount(prev => prev + 1);
    } catch (e) {
      console.error(e);
      handleFirestoreError(e, OperationType.CREATE, 'subscribers');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-blue-600 text-white text-center px-4">
      <div className="max-w-2xl mx-auto">
        <Mail className="mx-auto text-blue-300 mb-6" size={48} />
        <h2 className="text-3xl md:text-4xl font-black mb-4">매주 업데이트되는 보안 인사이트</h2>
        <p className="text-blue-100 text-lg mb-8">
          가장 중요한 보안 이슈와 대응 방안을 요약해서 보내드립니다. 현재 <span className="font-bold text-white bg-blue-500 px-2 py-1 rounded">{count.toLocaleString()}명</span>이 구독 중입니다!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요" 
            required
            className="flex-grow px-6 py-4 rounded-xl text-slate-900 bg-white focus:ring-4 focus:ring-blue-400 focus:outline-none"
          />
          <button 
            type="submit" 
            disabled={submitting}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            {submitting ? '구독중...' : <>구독하기 <ArrowRight size={20} /></>}
          </button>
        </form>
      </div>
    </section>
  );
}

