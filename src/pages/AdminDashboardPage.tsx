import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, serverTimestamp, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
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
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribeInsights: (() => void) | null = null;
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      if (user?.email && adminEmails.includes(user.email)) {
        setIsAdmin(true);
        loadSettings();
        
        // Listen to security insights
        unsubscribeInsights = onSnapshot(collection(db, 'insights'), (snapshot) => {
          const list: any[] = [];
          snapshot.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          setInsights(list);
        });
      } else {
        setIsAdmin(false);
        navigate('/');
      }
      setLoading(false);
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeInsights) (unsubscribeInsights as any)();
    };
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
              { id: 'security_insights', icon: <FileText size={20}/>, label: '인사이츠 (자동/수동)' },
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

          {activeTab === 'security_insights' && (
            <div>
              <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">보안 인사이트 통합 관리</h3>
                  <p className="text-slate-500 text-sm mt-1">AI 자동 예약, 인증 관리, 외부 API 피드를 통한 하이브리드 인사이트 전광판을 관리합니다.</p>
                </div>
                <button 
                  onClick={() => navigate('/insights')} 
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  게시판 이동
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">전체 등록 게시물</span>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{insights.length}개</p>
                </div>
                <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100 shadow-xs animate-fade-in">
                  <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">공개 중인 게시물</span>
                  <p className="text-3xl font-bold text-emerald-900 mt-1">
                    {insights.filter(i => !i.status || i.status === 'published').length}개
                  </p>
                </div>
                <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 shadow-xs animate-fade-in">
                  <span className="text-xs text-amber-600 font-bold uppercase tracking-wider">승인 대기 중 (Draft)</span>
                  <p className="text-3xl font-bold text-amber-900 mt-1">
                    {insights.filter(i => i.status === 'draft').length}개
                  </p>
                </div>
              </div>

              {/* Table list */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4 pl-6">카테고리</th>
                        <th className="p-4">제목</th>
                        <th className="p-4">작성 방식</th>
                        <th className="p-4">등록일</th>
                        <th className="p-4">상태</th>
                        <th className="p-4 pr-6 text-right">작업</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {insights.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-slate-400 font-medium">등록된 보안 인사이트가 없습니다.</td>
                        </tr>
                      ) : (
                        insights.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 pl-6">
                              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                {item.category || '보안'}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-800 max-w-xs truncate">{item.title}</td>
                            <td className="p-4 text-slate-600 text-xs">
                              {item.createdBy === 'auto' ? '🤖 AI 자동 수집' : item.createdBy === 'api' ? '🔌 API 외부입력' : '👤 관리자 작성'}
                            </td>
                            <td className="p-4 text-slate-400 text-xs">{item.date}</td>
                            <td className="p-4">
                              {item.status === 'draft' ? (
                                <span className="inline-flex text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold">대기 중</span>
                              ) : (
                                <span className="inline-flex text-emerald-700 bg-emerald-50 border border-emerald-150 px-2.5 py-0.5 rounded-full text-xs font-bold">공개 완료</span>
                              )}
                            </td>
                            <td className="p-4 pr-6 text-right flex justify-end gap-2 items-center">
                              {item.status === 'draft' && (
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateDoc(doc(db, 'insights', item.id), {
                                        status: 'published',
                                        updatedAt: serverTimestamp()
                                      });
                                    } catch (err) {
                                      console.error(err);
                                      alert('승인 중 오류가 발생했습니다.');
                                    }
                                  }}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                  승인
                                </button>
                              )}
                              <button
                                onClick={async () => {
                                  if (!confirm('정말 삭제하시겠습니까?')) return;
                                  try {
                                    await deleteDoc(doc(db, 'insights', item.id));
                                  } catch (err) {
                                    console.error(err);
                                    alert('삭제 중 오류가 발생했습니다.');
                                  }
                                }}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                삭제
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
