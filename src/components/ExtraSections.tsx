import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Mail, ArrowRight } from 'lucide-react';
import { addDoc, serverTimestamp } from 'firebase/firestore';

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
    case 'public': return '🏛️';
    case 'medical': return '🏥';
    case 'enterprise': return '🏭';
    case 'finance': return '🏦';
    default: return '🏢';
  }
};

const ClientCard: React.FC<{ client: ClientData }> = ({ client }) => (
  <div 
    className="inline-flex items-center gap-3 px-6 py-4 mx-3 bg-white rounded-[16px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow min-w-max"
  >
    {client.logoUrl ? (
      <img src={client.logoUrl} alt={client.name} className="h-8 object-contain" />
    ) : (
      <>
        <span className="text-2xl">{getClientIcon(client.type)}</span>
        <span className="font-bold text-slate-800 text-lg">{client.name}</span>
      </>
    )}
  </div>
);

export function ClientLogoSlider() {
  const [clients, setClients] = useState<ClientData[]>(defaultClients);

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
      }
    }
    fetchLogos();
  }, []);

  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  return (
    <section className="py-[120px] bg-brand-50 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">신뢰할 수 있는 파트너</h2>
        <p className="text-slate-600 text-xl">45개+ 고객사가 로뎀시스템을 선택했습니다</p>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap mb-6">
          {[...row1, ...row1, ...row1].map((client, idx) => (
            <ClientCard key={idx} client={client} />
          ))}
        </div>

        <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...row2, ...row2, ...row2].map((client, idx) => (
            <ClientCard key={idx} client={client} />
          ))}
        </div>
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
      alert('오류가 발생했습니다.');
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
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            {submitting ? '구독중...' : <>구독하기 <ArrowRight size={20} /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
