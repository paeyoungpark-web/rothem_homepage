import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContactSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    if (!privacyAgreed) {
      alert(t('contact.privacy_alert', '개인정보 수집 및 이용에 동의해주세요.'));
      return;
    }
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name,
        email,
        phone,
        message,
        privacyAgreed,
        createdAt: serverTimestamp()
      });
      alert(t('contact.success_msg', '문의가 성공적으로 접수되었습니다.'));
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setPrivacyAgreed(false);
    } catch (error) {
      console.error("Error submitting inquiry", error);
      alert(t('contact.error_msg', '접수 중 오류가 발생했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">{t('contact.title')}</h2>
            <p className="text-lg text-slate-600 mb-12">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <MapPin size={24} />
                </div>
                <div className="ml-6 flex items-center min-h-[3rem]">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{t('contact.address_label')}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{t('contact.address')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Phone size={24} />
                </div>
                <div className="ml-6 flex items-center min-h-[3rem]">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{t('contact.phone_label')}</h3>
                    <p className="mt-1 text-slate-600">{t('contact.phone_val')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Mail size={24} />
                </div>
                <div className="ml-6 flex items-center min-h-[3rem]">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{t('contact.email_label')}</h3>
                    <p className="mt-1 text-slate-600">{t('contact.email_val')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Globe size={24} />
                </div>
                <div className="ml-6 flex items-center min-h-[3rem]">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">{t('contact.website_label')}</h3>
                    <a href={t('contact.website_url')} target="_blank" rel="noopener noreferrer" className="mt-1 text-blue-600 hover:text-blue-800 transition-colors inline-block">{t('contact.website_val')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('contact.form_title')}</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">{t('contact.name')}</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t('contact.email')}</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">{t('contact.phone_input_label', '연락처 (선택)')}</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">{t('contact.message')}</label>
                <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"></textarea>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacy" className="font-medium text-slate-700 cursor-pointer">
                    {t('contact.privacy_agree', '개인정보 수집 및 이용에 동의합니다.')}
                  </label>
                  <p className="text-slate-500 mt-1">
                    {t('contact.privacy_desc', '수집된 개인정보는 문의 답변을 위해서만 사용되며, 목적 달성 후 지체 없이 파기됩니다.')}
                  </p>
                </div>
              </div>
              <button type="submit" disabled={submitting} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50">
                {submitting ? t('contact.submitting', '전송 중...') : t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
