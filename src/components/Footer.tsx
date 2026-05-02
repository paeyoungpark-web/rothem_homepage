import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex flex-col">
            {settings.logoImage ? (
              <img src={settings.logoImage} alt="rothemsystem logo" className="h-8 object-contain mb-2 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            ) : (
              <div className="flex items-end tracking-tighter italic mb-1">
                <span className="text-[#E60012] text-3xl font-black">R</span>
                <span className="text-[#004EA2] text-3xl font-black -ml-1">O</span>
                <span className="text-white text-xl font-bold tracking-tight ml-1 not-italic">{t('footer.company')}</span>
              </div>
            )}
            <p className="text-slate-500 text-xs font-semibold">Information & Technology</p>
          </div>
          <div className="flex space-x-6 text-slate-400 text-sm">
            <a href="/#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
            <a href="/#services" className="hover:text-white transition-colors">{t('nav.services')}</a>
            <a href="/products" className="hover:text-white transition-colors">{t('nav.products')}</a>
            <a href="/profile" className="hover:text-white transition-colors">{t('nav.profile')}</a>
            <a href="/#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-slate-400 text-sm flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="mb-2">
              {t('contact.address')}
            </p>
            <p>
              {t('footer.ceo')} &nbsp;|&nbsp; {t('footer.biz_num')} &nbsp;|&nbsp; {t('footer.tel')} &nbsp;|&nbsp; {t('footer.email')} &nbsp;|&nbsp; <a href="https://www.rothemsystem.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('footer.website')}</a>
            </p>
          </div>
          <p className="mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} {t('footer.company')} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
