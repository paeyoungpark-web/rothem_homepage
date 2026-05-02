import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-xl font-bold mb-4 md:mb-0">
            {t('footer.company')}
          </div>
          <div className="flex space-x-6 text-slate-400 text-sm">
            <a href="/#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
            <a href="/#services" className="hover:text-white transition-colors">{t('nav.services')}</a>
            <a href="/#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="/#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-slate-400 text-sm flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="mb-2">
              {t('contact.address')}
            </p>
            <p>
              {t('footer.ceo')} &nbsp;|&nbsp; {t('footer.biz_num')} &nbsp;|&nbsp; {t('footer.tel')} &nbsp;|&nbsp; {t('footer.email')} 
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
