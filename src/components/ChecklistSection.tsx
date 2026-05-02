import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function ChecklistSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checklistType, setChecklistType] = useState('개인정보보호 점검');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        name,
        email,
        checklistType,
        createdAt: serverTimestamp()
      });
      // In a real app, this would trigger an email or direct download.
      // For now, we'll just show an alert and reset.
      alert(`[\${checklistType}] 파일이 이메일로 전송되었습니다. (테스트용 알림)`);
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">무료 보안 체크리스트 다운로드</h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              로뎀시스템의 전문가들이 작성한 최신 보안 체크리스트를 무료로 받아보세요. 귀사의 보안 점수를 스스로 진단하고 취약점을 파악할 수 있는 가장 빠르고 확실한 방법입니다.
            </p>
            <ul className="space-y-4">
              {['개인정보보호 점검', 'ISO 27001 준비', '재택근무 보안가이드', '클라우드 보안 진단'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200">
                  <FileText className="text-blue-400" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">지금 바로 다운로드</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">자료 유형</label>
                <select 
                  value={checklistType} 
                  onChange={(e) => setChecklistType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                >
                  <option value="개인정보보호 점검">개인정보보호 점검 리스트 (2026.5 업데이트)</option>
                  <option value="ISO 27001 준비">ISO 27001 사전 진단표</option>
                  <option value="재택근무 보안가이드">재택근무자를 위한 필수 보안수칙</option>
                  <option value="클라우드 보안 진단">AWS/Azure 클라우드 보안 점검표</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">이름 / 직급</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="홍길동 대리"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">회사 이메일</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white" 
                />
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-4"
              >
                {submitting ? '신청 중...' : <><Download size={20} /> 자료 받기</>}
              </button>
              <p className="text-xs text-center text-slate-400 mt-4">
                입력하신 이메일로 자료가 전송됩니다. 마케팅 활용 동의에 동의하는 것으로 간주됩니다.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
