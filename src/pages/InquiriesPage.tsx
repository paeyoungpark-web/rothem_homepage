import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useTranslation } from 'react-i18next';
import { 
  Trash2, 
  MessageSquare, 
  Mail, 
  User, 
  Clock, 
  AlertCircle, 
  Phone, 
  Building, 
  CheckCircle2, 
  Send,
  Eye,
  FileText,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  privacyAgreed?: boolean;
  createdAt: any;
}

export default function InquiriesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  
  // Public Form States
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'ISO 27001',
    message: '',
    privacyAgreed: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      const adminEmails = ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'];
      const isUserAdmin = !!(user?.email && adminEmails.includes(user.email));
      setIsAdmin(isUserAdmin);
      if (isUserAdmin) {
        setShowAdminView(true); // Default to admin view if logged in as admin
      }
    });

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const results: Inquiry[] = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(results);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm(currentLang === 'ko' ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    if (!formData.name.trim()) {
      setFormError(currentLang === 'ko' ? '성함(담당자명)을 입력해 주세요.' : 'Please enter inquirer name.');
      setSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      setFormError(currentLang === 'ko' ? '이메일 주소를 입력해 주세요.' : 'Please enter email address.');
      setSubmitting(false);
      return;
    }
    if (!formData.message.trim()) {
      setFormError(currentLang === 'ko' ? '문의 내용을 작성해 주세요.' : 'Please enter message details.');
      setSubmitting(false);
      return;
    }
    if (!formData.privacyAgreed) {
      setFormError(currentLang === 'ko' ? '개인정보 이용 및 수집 방침에 동의해 주세요.' : 'Please agree to the privacy terms.');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        company: formData.company || '',
        email: formData.email,
        phone: formData.phone || '',
        category: formData.category,
        message: formData.message,
        privacyAgreed: true,
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        category: 'ISO 27001',
        message: '',
        privacyAgreed: false,
      });
    } catch (err) {
      console.error(err);
      setFormError(currentLang === 'ko' ? '제출 도중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate();
      return new Intl.DateTimeFormat(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-350">
      <SEO 
        title={currentLang === 'ko' ? '종합 컨설팅 문의 및 자문신청 | 로뎀시스템' : 'Consulting & Certification Inquiry | Rothem System'}
        description={currentLang === 'ko' 
          ? '로뎀시스템의 1:1 최고 전문가 밀착 정보보안, AI 경영시스템(ISO 42001) 컴플라이언스 견적 및 산출물 신청 양식입니다.' 
          : 'Consultation sign up form for information security and AI management standards.'}
      />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          
          {/* Admin Switch Header */}
          {isAdmin && (
            <div className="mb-10 p-4 bg-blue-50 dark:bg-blue-950/60 rounded-2xl border-2 border-blue-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-sm font-bold text-blue-900 dark:text-blue-200">
                  {currentLang === 'ko' ? '🔓 관리자 전용 권한이 활성화되었습니다.' : '🔓 Administrator privilege is active.'}
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowAdminView(false)}
                  className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    !showAdminView 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {currentLang === 'ko' ? '문의 양식 작성' : 'View Input Form'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminView(true)}
                  className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    showAdminView 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {currentLang === 'ko' ? `수신함 (${inquiries.length})` : `Inbox (${inquiries.length})`}
                </button>
              </div>
            </div>
          )}

          {/* ADMIN VIEW OR CLIENT INPUT VIEW */}
          {isAdmin && showAdminView ? (
            /* ADMIN LIST VIEW */
            <div>
              <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-450 rounded-2xl">
                    <MessageSquare size={28} />
                  </span>
                  {currentLang === 'ko' ? '접수된 문의 상세 내역' : 'Customer Inquiries'}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {currentLang === 'ko' 
                    ? `로뎀시스템 채널을 통해 총 ${inquiries.length}건의 문의가 기록되었습니다.` 
                    : `Total ${inquiries.length} inquiries received.`}
                </p>
              </div>

              {loading ? (
                <div className="py-20 flex justify-center">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center shadow-md border-2 border-slate-100 dark:border-slate-800">
                  <MessageSquare size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    {currentLang === 'ko' ? '접수된 문의가 없습니다.' : 'No inquiries yet.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((inquiry, idx) => (
                    <motion.div 
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-150/40 dark:border-slate-800 relative group"
                    >
                      <button 
                        onClick={() => handleDelete(inquiry.id)}
                        className="absolute top-6 right-6 p-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-xl transition-colors md:opacity-0 group-hover:opacity-100"
                        title="Delete inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6 text-xs sm:text-sm flex-wrap">
                        {inquiry.company && (
                          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-850 dark:text-slate-200 font-bold">
                            <Building size={14} className="text-slate-400" />
                            <span>{inquiry.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                          <User size={14} className="text-slate-400" />
                          <span>{inquiry.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-slate-400" />
                          <a href={`mailto:${inquiry.email}`} className="text-blue-600 dark:text-blue-400 hover:underline break-all">{inquiry.email}</a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-slate-400" />
                            <a href={`tel:${inquiry.phone}`} className="text-blue-650 dark:text-blue-400 hover:underline">{inquiry.phone}</a>
                          </div>
                        )}
                        {inquiry.category && (
                          <span className="bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 px-2.5 py-1 rounded-lg font-bold text-[11px] uppercase tracking-wide">
                            {inquiry.category}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Clock size={13} />
                          <span>{formatDate(inquiry.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
                        <p className="text-slate-800 dark:text-slate-250 whitespace-pre-wrap font-medium">
                          {inquiry.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* PUBLIC CLIENT SUBMISSION FORM */
            <div className="grid md:grid-cols-12 gap-8 items-start">
              
              {/* Left explanation card */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-450 text-xs font-bold mb-4">
                    <Briefcase size={14} />
                    {currentLang === 'ko' ? '로뎀 자문 신청 안내' : 'Direct consulting request'}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                    보안 컴플라이언스 <br />
                    <span className="text-brand-600 dark:text-brand-400">전문가 1:1 상담 기안</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    불투명하고 매칭이 느렸던 실무 자문 양식. 인증 범위, 인프라 크기, 필요 산출 표준안 구분에 따라 로뎀시스템의 수석 위원이 직접 검토하여 24시간 이내 공식 회신을 송부해 드립니다.
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold">합리적인 투명 단가 최적화</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">불필요한 공수 불풀림을 완전히 배제하고 조직의 비즈니스 규모에 맞게 효율적으로 합리안을 제시합니다.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold">100종 명세 견본 지원</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">단순 견적서 통배포에 그치지 않고, 필요 요청 시 ISMS/AIMS 정식 산출체계 색인 샘플을 이메일 동반 배송합니다.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <Mail size={18} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-500 text-[11px] font-bold">공식 접수 연락처</strong>
                      <p className="text-slate-700 dark:text-slate-350 text-xs font-bold mt-0.5">paeyoungpark@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right input form box */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-2 border-slate-200/40 dark:border-slate-800/80 shadow-xl">
                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-500" size={36} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {currentLang === 'ko' ? '문의가 성공적으로 기록되었습니다.' : 'Consultation Submitted Successfully'}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto mb-8">
                        {currentLang === 'ko' 
                          ? '제출하신 기획 사양 및 담당 연락처를 확인하여 수석 심사원 조가 확인 분석서를 정리 송부해 드리겠습니다.' 
                          : 'Our senior lead auditors will analyze your inputs and get back to you shortly.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs transition-all"
                      >
                        {currentLang === 'ko' ? '추가 문의하기' : 'Submit Another Request'}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                          {currentLang === 'ko' ? '기관명 / 회사명' : 'Company / Instance Name'} <span className="text-slate-400 font-normal">(선택)</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500" size={16} />
                          <input
                            type="text"
                            placeholder={currentLang === 'ko' ? '예시) 로뎀금융테크' : 'e.g. Rothem Tech'}
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                          {currentLang === 'ko' ? '성함 / 담당자명 *' : 'Your Name *'}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="text"
                            placeholder={currentLang === 'ko' ? '신청인 실명을 기재해 주십시오' : 'e.g. John Doe'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                            {currentLang === 'ko' ? '협신용 이메일 *' : 'Email Address *'}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                              type="email"
                              placeholder="contact@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                            {currentLang === 'ko' ? '회신처 연락처' : 'Phone Number'} <span className="text-slate-400 font-normal">(선택)</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                              type="tel"
                              placeholder="010-0000-0000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                          {currentLang === 'ko' ? '관심 자문 규격 / 부문' : 'Interested Standards'}
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100"
                        >
                          <option value="ISO 27001">ISO 27001 (정보보호)</option>
                          <option value="ISO 27701">ISO 27701 (개인정보)</option>
                          <option value="ISO 42001">ISO 42001 (인공지능 경영)</option>
                          <option value="ISMS-P">ISMS-P (국내 종합)</option>
                          <option value="취약점 정밀진단">취약점 정밀진단 & 모의해킹</option>
                          <option value="기타 정보통신 자문">기타 정보통신 자문</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5 uppercase tracking-wide">
                          {currentLang === 'ko' ? '상세 요구조건 및 문의 메시지 *' : 'Message details *'}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={currentLang === 'ko' ? '현재 인프라의 종류, 규모, 시기 등 원하시는 상세 요구 지침을 남겨 주시면 자문 일자 협정에 큰 도움이 됩니다.' : 'Describe your infra, goals and timeline...'}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100 min-h-[100px]"
                        />
                      </div>

                      {/* Privacy Terms Consent */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-850 rounded-2xl">
                        <label className="flex items-start gap-2.5 cursor-pointer user-select-none">
                          <input
                            type="checkbox"
                            checked={formData.privacyAgreed}
                            onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 dark:border-slate-800 text-brand-600 focus:ring-brand-500"
                          />
                          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold select-none">
                            {currentLang === 'ko'
                              ? '[필수] 문의 처리를 위한 최소 고유 정보 수집 및 이용 방침에 전적으로 기안 동의합니다.'
                              : '[Required] I fully agree to the privacy statement for handling inquiries.'}
                          </span>
                        </label>
                      </div>

                      {formError && (
                        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                          <AlertCircle size={16} />
                          <span>{formError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-99"
                      >
                        <Send size={16} />
                        {submitting 
                          ? (currentLang === 'ko' ? '제출 등록 처리 중...' : 'Submitting request...') 
                          : (currentLang === 'ko' ? '보안 견적 자문 신청 접수' : 'Submit Consultation Request')}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
