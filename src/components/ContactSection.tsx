import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

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
            </div>
          </div>

          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('contact.form_title')}</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">{t('contact.name')}</label>
                <input type="text" id="name" className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t('contact.email')}</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">{t('contact.message')}</label>
                <textarea id="message" rows={4} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"></textarea>
              </div>
              <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
