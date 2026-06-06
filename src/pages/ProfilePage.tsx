import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, CheckCircle2, Award, Briefcase, GraduationCap, ArrowLeft, ShieldCheck, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { profileData as fallbackData } from '../data/profileData';
import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function ProfilePage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';
  const { settings, updateSettings } = useSettings();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data state
  const [profile, setProfile] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      setIsAdmin(user?.email ? adminEmails.includes(user.email) : false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'ceo_profile'));
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Failed to load profile from firestore", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentLang]);

  const handleEditClick = () => {
    setEditData(profile || {
      name: fallbackData[currentLang].name,
      title: fallbackData[currentLang].title,
      subtitle: fallbackData[currentLang].subtitle,
      photoUrl: settings.profileImage || "",
      summary: fallbackData[currentLang].summary,
      history: fallbackData[currentLang].sections.career.items.map((i: string) => ({ year: '', content: i }))
    });
    setSaveMessage('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaveMessage(currentLang === 'ko' ? '저장 중...' : 'Saving...');
      await setDoc(doc(db, 'settings', 'ceo_profile'), {
        ...editData,
        updatedAt: serverTimestamp()
      });
      setProfile(editData);
      
      // Sync back base64 image immediately to site-wide header & CEOMessage avatar
      if (editData.photoUrl) {
        await updateSettings({ profileImage: editData.photoUrl });
      }
      
      setSaveMessage(currentLang === 'ko' ? '프로필이 성공적으로 업데이트되었습니다!' : 'Profile updated successfully!');
      setTimeout(() => {
        setSaveMessage('');
        setIsEditing(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setSaveMessage(currentLang === 'ko' ? '업데이트 실패' : 'Failed to save profile');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(currentLang === 'ko' ? '이미지 파일만 지원합니다.' : 'Only images are supported.');
      return;
    }

    setUploadingImage(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setEditData((prev: any) => ({ ...prev, photoUrl: dataUrl }));
        setUploadingImage(false);
      };
      img.onerror = () => {
        setUploadingImage(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  const data = profile ? {
    ...fallbackData[currentLang],
    name: profile.name || fallbackData[currentLang].name,
    title: profile.title || fallbackData[currentLang].title,
    subtitle: profile.subtitle || fallbackData[currentLang].subtitle,
    summary: profile.summary || fallbackData[currentLang].summary,
    photoUrl: profile.photoUrl || settings.profileImage,
    history: profile.history || []
  } : fallbackData[currentLang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              {currentLang === 'ko' ? '돌아가기' : 'Go Back'}
            </button>
            {isAdmin && !isEditing && (
              <button 
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
              >
                <Edit size={16} />
                {currentLang === 'ko' ? '프로필 편집' : 'Edit Profile'}
              </button>
            )}
          </div>

          {isEditing && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
                <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b pb-4">
                  {currentLang === 'ko' ? '프로필 편집 양식' : 'Edit Profile Form'}
                </h2>
                
                {saveMessage && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center border ${
                    saveMessage.includes('실패') || saveMessage.includes('Failed')
                      ? 'bg-red-50 text-red-700 border-red-100'
                      : 'bg-green-50 text-green-700 border-green-100'
                  }`}>
                    <CheckCircle2 size={20} className="mr-3" />
                    <span className="font-semibold">{saveMessage}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {currentLang === 'ko' ? '이름' : 'Name'}
                      </label>
                      <input 
                        type="text" 
                        value={editData.name} 
                        onChange={e => setEditData({...editData, name: e.target.value})}
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {currentLang === 'ko' ? '직함 (예: 대표이사)' : 'Title'}
                      </label>
                      <input 
                        type="text" 
                        value={editData.title} 
                        onChange={e => setEditData({...editData, title: e.target.value})}
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-slate-700 mb-2">
                         {currentLang === 'ko' ? '서브타이틀 (예: ISMS-P, ISO 인증)' : 'Subtitle'}
                       </label>
                       <input 
                        type="text" 
                        value={editData.subtitle} 
                        onChange={e => setEditData({...editData, subtitle: e.target.value})}
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {currentLang === 'ko' ? '소개 (약력 요약)' : 'Summary'}
                    </label>
                    <textarea 
                      value={editData.summary} 
                      onChange={e => setEditData({...editData, summary: e.target.value})}
                      rows={4}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {currentLang === 'ko' ? '대표 프로필 사진 업로드' : 'Profile Photo Upload'}
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                      <div className="relative group shrink-0">
                        <img 
                          src={editData.photoUrl || "/images/ceo_profile.jpg"} 
                          alt="Preview" 
                          onError={(e) => {
                            e.currentTarget.src = "/images/ceo_profile.jpg";
                          }}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" 
                        />
                        {editData.photoUrl && (
                          <button
                            type="button"
                            onClick={() => setEditData({...editData, photoUrl: ''})}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors text-xs"
                            title={currentLang === 'ko' ? '기본 이미지로 리셋' : 'Reset to default logo'}
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="flex-grow">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="text-xs md:text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer disabled:opacity-50"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                          {currentLang === 'ko' 
                            ? '※ 업로드 시 브라우저 내에서 가로세로 400px 수준으로 자동 리사이징 및 압축됩니다.' 
                            : '※ Images will be automatically resized to 400px and compressed on selection.'}
                        </p>
                        {uploadingImage && (
                          <span className="text-xs font-bold text-blue-600 block mt-1 animate-pulse">
                            {currentLang === 'ko' ? '처리 중...' : 'Processing image...'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                     <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-bold text-slate-700">
                          {currentLang === 'ko' ? '경력 및 주요 실적 (연도별)' : 'Career History'}
                        </label>
                        <button 
                          onClick={() => setEditData({...editData, history: [...editData.history, {year: '', content: ''}]})}
                          className="text-sm text-blue-600 font-bold hover:underline"
                        >
                          {currentLang === 'ko' ? '+ 항목 추가' : '+ Add Item'}
                        </button>
                     </div>
                     <div className="space-y-3">
                        {editData.history.map((h: any, idx: number) => (
                           <div key={idx} className="flex gap-3">
                              <input 
                                type="text"
                                placeholder={currentLang === 'ko' ? '연도 (예: 2026)' : 'Year (e.g. 2026)'}
                                value={h.year}
                                onChange={e => {
                                  const nh = [...editData.history];
                                  nh[idx].year = e.target.value;
                                  setEditData({...editData, history: nh});
                                }}
                                className="w-1/4 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-center font-bold"
                              />
                              <input 
                                type="text"
                                placeholder={currentLang === 'ko' ? '상세 내역...' : 'Details...'}
                                value={h.content}
                                onChange={e => {
                                  const nh = [...editData.history];
                                  nh[idx].content = e.target.value;
                                  setEditData({...editData, history: nh});
                                }}
                                className="flex-grow p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                              />
                              <button 
                                onClick={() => {
                                  const nh = [...editData.history];
                                  nh.splice(idx, 1);
                                  setEditData({...editData, history: nh});
                                }}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <X size={20} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                </div>

                <div className="mt-8 flex justify-end gap-3 border-t pt-6">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm"
                  >
                    {currentLang === 'ko' ? '취소' : 'Cancel'}
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={uploadingImage}
                    className="px-6 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    <Save size={18} />
                    {currentLang === 'ko' ? '저장하기' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Profile Card */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-32 text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-50 shadow-md mb-6 relative bg-blue-100 flex items-center justify-center">
                  <img 
                    src={data.photoUrl || settings.profileImage || "/images/ceo_profile.jpg"} 
                    alt={data.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/images/ceo_profile.jpg";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-4 border border-green-100">
                  <ShieldCheck size={14} />
                  {currentLang === 'ko' ? 'ISO 공인 선임심사원' : 'Certified Lead Auditor'}
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">{data.name}</h1>
                <p className="text-slate-600 font-medium mb-1">{data.title}</p>
                <p className="text-slate-500 text-sm mb-8">{data.subtitle}</p>

                <a 
                  href={data.linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Linkedin size={20} />
                  LinkedIn Connect
                </a>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{currentLang === 'ko' ? '소개' : 'Summary'}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {data.summary}
                </p>
              </motion.div>

              {/* Certifications */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                    <Award size={24} />
                  </span>
                  {currentLang === 'ko' ? '수상 및 주요 실적' : 'Awards & Milestones'}
                </h3>
                <ul className="space-y-4">
                  {data.history && data.history.map((item: any, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full">
                         {item.year && (
                           <span className="text-blue-600 font-bold whitespace-nowrap">{item.year}</span>
                         )}
                         <span className="text-slate-700 leading-relaxed font-medium">{item.content}</span>
                      </div>
                    </li>
                  ))}
                  {(!data.history || data.history.length === 0) && data.sections.certifications.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="text-blue-500 mr-3 shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Experience Categories */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                    <ShieldCheck size={24} />
                  </span>
                  {data.sections.experience.title}
                </h3>
                
                <div className="space-y-8">
                  {data.sections.experience.categories.map((cat: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-slate-100 pl-6 pb-2 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 border-2 border-white"></div>
                      <h4 className="text-lg font-bold text-slate-900 mb-3">{cat.name}</h4>
                      <ul className="space-y-2">
                        {cat.points.map((point: string, pIdx: number) => (
                          <li key={pIdx} className="text-slate-600 relative pl-4">
                            <span className="absolute left-0 top-[10px] w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Career & Education Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="p-2 bg-slate-800 text-blue-400 rounded-lg mr-3">
                      <Briefcase size={24} />
                    </span>
                    {data.sections.career.title}
                  </h3>
                  <ul className="space-y-4">
                    {data.sections.career.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex flex-col text-slate-300">
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-600 rounded-3xl p-8 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="p-2 bg-blue-500 text-white rounded-lg mr-3">
                      <GraduationCap size={24} />
                    </span>
                    {data.sections.education.title}
                  </h3>
                  <ul className="space-y-5">
                    {data.sections.education.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-blue-100">
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* CEO Activities */}
              {settings.activities && settings.activities.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
                      <Award size={24} />
                    </span>
                    {currentLang === 'ko' ? '대표이사 활동' : 'CEO Activities'}
                  </h3>
                  
                  <div className="flex flex-col gap-8">
                    {settings.activities.map((act) => (
                      <div key={act.id} className="flex flex-col md:flex-row gap-6 p-4 md:p-0 group">
                        <div className="w-full md:w-2/5 aspect-video rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
                          <img 
                            src={act.image} 
                            alt={act.title || 'CEO Activity'} 
                            className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          {act.date && (
                            <span className="text-sm font-semibold text-blue-600 mb-2">{act.date}</span>
                          )}
                          <h4 className="text-xl font-bold text-slate-900 mb-3">{act.title}</h4>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
