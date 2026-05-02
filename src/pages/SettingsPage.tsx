import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

import { ActivityPost } from '../context/SettingsContext';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'ko' ? 'ko' : 'en';

  const [message, setMessage] = useState('');
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const activitiesInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    type: 'logo' | 'profile' | 'activity'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'activity') {
      const newActivities: ActivityPost[] = [];
      let processed = 0;
      const fileList = Array.from(files) as File[];
      
      fileList.forEach((file) => {
        if (!file.type.startsWith('image/')) {
          processed++;
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 1000;
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

            newActivities.push({
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              image: canvas.toDataURL('image/jpeg', 0.85),
              title: '',
              date: new Date().toISOString().split('T')[0],
              description: ''
            });
            processed++;
            if (processed === files.length) {
              updateSettings({ activities: [...newActivities, ...(settings.activities || [])] });
              setMessage(currentLang === 'ko' ? '활동 항목이 추가되었습니다. 내용을 입력해주세요.' : 'Activity added. Please fill in details.');
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
      return;
    }

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setMessage(currentLang === 'ko' ? '이미지 파일만 업로드 가능합니다.' : 'Only image files are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = type === 'logo' ? 400 : 400;
        const MAX_HEIGHT = type === 'logo' ? 200 : 400;
        
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

        if (type === 'logo') {
          updateSettings({ logoImage: dataUrl });
          setMessage(currentLang === 'ko' ? '로고가 업데이트되었습니다.' : 'Logo updated successfully.');
        } else {
          updateSettings({ profileImage: dataUrl });
          setMessage(currentLang === 'ko' ? '프로필 사진이 업데이트되었습니다.' : 'Profile image updated successfully.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const updateActivity = (id: string, updates: Partial<ActivityPost>) => {
    if (!settings.activities) return;
    const updatedActivities = settings.activities.map(act => 
      act.id === id ? { ...act, ...updates } : act
    );
    updateSettings({ activities: updatedActivities });
  };

  const removeActivity = (id: string) => {
    if (!settings.activities) return;
    const updatedActivities = settings.activities.filter(act => act.id !== id);
    updateSettings({ activities: updatedActivities });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {currentLang === 'ko' ? '시스템 설정' : 'System Settings'}
            </h1>
            <p className="text-slate-500 mb-8 pb-6 border-b border-slate-100">
              {currentLang === 'ko' ? '웹사이트의 로고 및 텍스트, 프로필 이미지 등을 변경할 수 있습니다.' : 'Update website logo and profile images here.'}
            </p>

            {message && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center border border-green-100">
                <CheckCircle2 size={20} className="mr-3" />
                <span className="font-medium">{message}</span>
              </div>
            )}

            <div className="space-y-10">
              {/* Logo Upload */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {currentLang === 'ko' ? '사이트 로고' : 'Site Logo'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-48 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden p-2 relative group">
                    {settings.logoImage ? (
                      <>
                        <img src={settings.logoImage} alt="Current Logo" className="max-w-full max-h-full object-contain" />
                        <button
                          onClick={() => {
                            updateSettings({ logoImage: null });
                            setMessage(currentLang === 'ko' ? '로고가 삭제되었습니다.' : 'Logo removed.');
                          }}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-xs"
                          title="Delete Logo"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-400 text-sm font-medium">No Logo</span>
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      ref={logoInputRef}
                      onChange={(e) => handleImageUpload(e, 'logo')}
                    />
                    <button 
                      onClick={() => logoInputRef.current?.click()}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                    >
                      <UploadCloud size={18} />
                      {currentLang === 'ko' ? '로고 이미지 업로드' : 'Upload Logo'}
                    </button>
                    <p className="text-xs text-slate-500 mt-3 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {currentLang === 'ko' ? '권장 크기: 가로 400px 이내 (PNG/JPG 형식)' : 'Recommended: Width < 400px (PNG/JPG)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Details Upload/Edit */}
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {currentLang === 'ko' ? '푸터 및 회사 정보' : 'Footer & Company Info'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">CEO {currentLang === 'ko' ? '(대표이사)' : ''}</label>
                    <input 
                      type="text" 
                      value={settings.company?.ceo || ''}
                      onChange={(e) => updateSettings({ company: { ...settings.company, ceo: e.target.value } })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">{currentLang === 'ko' ? '이메일' : 'Email'}</label>
                    <input 
                      type="email" 
                      value={settings.company?.email || ''}
                      onChange={(e) => updateSettings({ company: { ...settings.company, email: e.target.value } })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">{currentLang === 'ko' ? '전화번호' : 'Phone'}</label>
                    <input 
                      type="text" 
                      value={settings.company?.phone || ''}
                      onChange={(e) => updateSettings({ company: { ...settings.company, phone: e.target.value } })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-600">{currentLang === 'ko' ? '사업자등록번호' : 'Business Number'}</label>
                    <input 
                      type="text" 
                      value={settings.company?.businessNumber || ''}
                      onChange={(e) => updateSettings({ company: { ...settings.company, businessNumber: e.target.value } })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 text-slate-600">{currentLang === 'ko' ? '회사 주소' : 'Address'}</label>
                    <input 
                      type="text" 
                      value={settings.company?.address || ''}
                      onChange={(e) => updateSettings({ company: { ...settings.company, address: e.target.value } })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Upload */}
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {currentLang === 'ko' ? '대표이사 프로필 사진' : 'CEO Profile Photo'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-32 h-32 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden pb-0 bg-blue-50 relative group">
                    {settings.profileImage ? (
                      <>
                        <img src={settings.profileImage} alt="Current Profile" className="w-full h-full object-cover" />
                        <button
                          onClick={() => {
                            updateSettings({ profileImage: null });
                            setMessage(currentLang === 'ko' ? '프로필 사진이 삭제되었습니다.' : 'Profile image removed.');
                          }}
                          className="absolute top-2 right-1/4 translate-x-1/2 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 text-xs"
                          title="Delete Profile Image"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-400 text-sm font-medium text-center">No Photo</span>
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      ref={profileInputRef}
                      onChange={(e) => handleImageUpload(e, 'profile')}
                    />
                    <button 
                      onClick={() => profileInputRef.current?.click()}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                    >
                      <UploadCloud size={18} />
                      {currentLang === 'ko' ? '프로필 사진 업로드' : 'Upload Profile Photo'}
                    </button>
                    <p className="text-xs text-slate-500 mt-3 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {currentLang === 'ko' ? '정방형 이미지 권장 (예: 400x400)' : 'Square Image Recommended (e.g. 400x400)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CEO Activities Upload */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {currentLang === 'ko' ? '대표이사 활동 사진' : 'CEO Activity Photos'}
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      hidden 
                      ref={activitiesInputRef}
                      onChange={(e) => handleImageUpload(e, 'activity')}
                    />
                    <button 
                      onClick={() => activitiesInputRef.current?.click()}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                    >
                      <UploadCloud size={18} />
                      {currentLang === 'ko' ? '활동 항목 추가' : 'Add Activity'}
                    </button>
                    <button
                      onClick={() => {
                        updateSettings({ activities: [] });
                        setMessage(currentLang === 'ko' ? '모든 활동 항목이 삭제되었습니다.' : 'All activities removed.');
                      }}
                      className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-xl transition-colors"
                    >
                      {currentLang === 'ko' ? '전체 초기화' : 'Clear All'}
                    </button>
                  </div>
                  
                  {settings.activities && settings.activities.length > 0 && (
                    <div className="flex flex-col gap-6 mt-6">
                      {settings.activities.map((act) => (
                        <div key={act.id} className="flex flex-col md:flex-row gap-6 p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                          <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden shrink-0 border border-slate-100 group">
                            <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeActivity(act.id)}
                              className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex-grow flex flex-col gap-4">
                            <input
                              type="text"
                              value={act.title}
                              onChange={(e) => updateActivity(act.id, { title: e.target.value })}
                              placeholder={currentLang === 'ko' ? '게시물 제목' : 'Post Title'}
                              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="date"
                              value={act.date}
                              onChange={(e) => updateActivity(act.id, { date: e.target.value })}
                              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
                            />
                            <textarea
                              value={act.description}
                              onChange={(e) => updateActivity(act.id, { description: e.target.value })}
                              placeholder={currentLang === 'ko' ? '게시물 내용' : 'Post Description'}
                              rows={3}
                              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
