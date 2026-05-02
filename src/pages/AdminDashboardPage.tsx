import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Shield, Users, FileText, Settings, BarChart2, Mail, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AdminDashboardPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // State for counters
  const [counters, setCounters] = useState({ consulting: 0, clients: 0, certs: 0, education: 0, smartFactory: 0 });
  const [notice, setNotice] = useState({ active: false, text: '', link: '' });
  const [generatingThreat, setGeneratingThreat] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      if (user?.email && adminEmails.includes(user.email)) {
        setIsAdmin(true);
        loadSettings();
      } else {
        setIsAdmin(false);
        navigate('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadSettings = async () => {
    try {
      const countersSnap = await getDoc(doc(db, 'site_settings', 'counters'));
      if (countersSnap.exists()) setCounters(countersSnap.data() as any);

      const noticeSnap = await getDoc(doc(db, 'site_settings', 'notice_banner'));
      if (noticeSnap.exists()) setNotice(noticeSnap.data() as any);
    } catch (e) {
      console.error(e);
    }
  };

  const saveCounters = async () => {
    await setDoc(doc(db, 'site_settings', 'counters'), counters);
    alert('저장되었습니다.');
  };

  const saveNotice = async () => {
    await setDoc(doc(db, 'site_settings', 'notice_banner'), notice);
    alert('저장되었습니다.');
  };

  const generateDailyThreat = async () => {
    try {
      setGeneratingThreat(true);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are a cybersecurity expert for South Korea.
Generate a JSON object for today's daily security threat.
The JSON must have the following keys exactly, with no markdown formatting around it:
{
  "title": "A short, catchy title of the threat limit 100 chars (Korean)",
  "description": "Detailed explanation of the threat, its impact (Korean)",
  "level": "low", "medium", "high", or "critical",
  "remediation": "Expert guide on how to fix or prevent it (Korean)"
}
Return only the raw JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      const responseText = response.text || "{}";
      const cleanedJSON = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const threatData = JSON.parse(cleanedJSON);
      
      await addDoc(collection(db, 'daily_threats'), {
        ...threatData,
        date: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      });
      
      alert('오늘의 보안 위협이 생성되었습니다!');
    } catch (err) {
      console.error(err);
      alert('생성에 실패했습니다.');
    } finally {
      setGeneratingThreat(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 flex px-4 gap-6 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 h-[calc(100vh-140px)] sticky top-28 overflow-y-auto">
          <h2 className="text-lg font-bold text-slate-900 mb-6 px-4">관리자 대시보드</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: 'overview', icon: <BarChart2 size={20}/>, label: '오버뷰' },
              { id: 'inquiries', icon: <Mail size={20}/>, label: '문의 관리' },
              { id: 'threats', icon: <AlertTriangle size={20}/>, label: '오늘의 위협 생성' },
              { id: 'leads', icon: <FileText size={20}/>, label: '체크리스트 (리드)' },
              { id: 'subscribers', icon: <Users size={20}/>, label: '뉴스레터 구독자' },
              { id: 'settings', icon: <Settings size={20}/>, label: '사이트 설정 (카운터/공지)' },
              { id: 'logos', icon: <ImageIcon size={20}/>, label: '고객사 로고' },
              { id: 'team', icon: <Shield size={20}/>, label: '팀원 관리' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors \${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-grow bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">오버뷰</h3>
              <p className="text-slate-600 mb-4">좌측 메뉴를 선택하여 각 항목을 관리하세요.</p>
              <div className="p-4 bg-blue-50 rounded-xl text-blue-800">
                알림: 현재는 프로토타입 버전의 관리자 대시보드이며, 일부 기능은 /settings, /inquiries 기존 라우트로 연결되거나 임시 UI로 제공됩니다.
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">문의 관리</h3>
                <button onClick={() => navigate('/inquiries')} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm">상세 페이지로 이동</button>
              </div>
              <p>기존 문의 내역 페이지(/inquiries)를 사용합니다.</p>
            </div>
          )}

          {activeTab === 'threats' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">오늘의 보안 위협 자동 생성</h3>
              </div>
              <p className="mb-6 text-slate-600">Gemini 2.5 Flash 모델을 사용하여 매일마다 새로운 보안 위협 시나리오와 대응 가이드를 생성합니다. 생성된 위협은 메인 페이지에 표시됩니다.</p>
              <button 
                onClick={generateDailyThreat} 
                disabled={generatingThreat}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {generatingThreat ? '생성 중...' : <><AlertTriangle size={20} /> 생성 실행하기</>}
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-10">
              <section>
                <h3 className="text-2xl font-bold mb-4">상단 공지 배너 설정</h3>
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="bannerActive" checked={notice.active} onChange={e => setNotice({...notice, active: e.target.checked})} />
                    <label htmlFor="bannerActive" className="font-medium">배너 활성화</label>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">공지 내용</label>
                    <input type="text" value={notice.text} onChange={e => setNotice({...notice, text: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">링크 (선택)</label>
                    <input type="text" value={notice.link} onChange={e => setNotice({...notice, link: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <button onClick={saveNotice} className="px-4 py-2 bg-blue-600 text-white rounded-lg">저장</button>
                </div>
              </section>

              <section className="pt-6 border-t">
                <h3 className="text-2xl font-bold mb-4">수행실적 카운터 편집</h3>
                <div className="grid grid-cols-2 gap-4 max-w-xl mb-4">
                  <div>
                    <label className="block text-sm mb-1">컨설팅 수행</label>
                    <input type="number" value={counters.consulting} onChange={e => setCounters({...counters, consulting: parseInt(e.target.value)||0})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">고객사</label>
                    <input type="number" value={counters.clients} onChange={e => setCounters({...counters, clients: parseInt(e.target.value)||0})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">인증 획득 (ISO27001 & 42001 심사)</label>
                    <input type="number" value={counters.certs} onChange={e => setCounters({...counters, certs: parseInt(e.target.value)||0})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">대표 심사원 교육 (명)</label>
                    <input type="number" value={counters.education} onChange={e => setCounters({...counters, education: parseInt(e.target.value)||0})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">스마트공장 점검/평가/자문</label>
                    <input type="number" value={counters.smartFactory} onChange={e => setCounters({...counters, smartFactory: parseInt(e.target.value)||0})} className="w-full border rounded-lg px-4 py-2" />
                  </div>
                </div>
                <button onClick={saveCounters} className="px-4 py-2 bg-blue-600 text-white rounded-lg">저장</button>
              </section>
            </div>
          )}

          {(activeTab === 'leads' || activeTab === 'subscribers' || activeTab === 'logos' || activeTab === 'team') && (
            <div>
              <h3 className="text-2xl font-bold mb-6">{activeTab} 관리</h3>
              <p className="text-slate-600">이 탭의 편집 기능은 백엔드 Firebase 설정 및 추가 UI 작업(Storage 업로드 등)이 필요하여 현재 기본 레이아웃만 구성되어 있습니다.</p>
              <br/>
              {activeTab === 'logos' && <p>Firebase Storage를 통해 이미지를 업로드하고 client_logos 컬렉션에 문서를 추가하는 기능을 구현할 수 있습니다.</p>}
              {activeTab === 'team' && <p>team_members 컬렉션 문서를 추가/수정하여 팀원 목록을 관리합니다.</p>}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
