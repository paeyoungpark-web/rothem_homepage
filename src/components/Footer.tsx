import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Address */}
          <div className="flex flex-col">
            <Link to="/" className="mb-6 inline-block">
              {settings.logoImage ? (
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-sm ring-1 ring-white/20">
                  <img src={settings.logoImage} alt="rothemsystem logo" className="h-8 object-contain" />
                </div>
              ) : (
                <div className="flex items-end tracking-tighter italic">
                  <span className="text-brand-500 text-4xl font-black">R</span>
                  <span className="text-brand-400 text-4xl font-black -ml-1">O</span>
                  <span className="text-white text-2xl font-bold tracking-tight ml-2 not-italic">rothemsystem</span>
                </div>
              )}
            </Link>
            <p className="text-brand-400 font-bold mb-4">2010년 설립 · 정보보호 전문기업</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {(settings.company as any)?.address || t('contact.address')}
            </p>
          </div>

          {/* Column 2: Solutions */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-6">보안 솔루션</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">취급 제품 (eWalker DLP 등)</Link></li>
              <li><Link to="/#case-studies" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">솔루션 도입사례</Link></li>
              <li><Link to="/#contact" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">견적 문의</Link></li>
            </ul>
          </div>

          {/* Column 3: Consulting */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-6">컨설팅 & 자문</h4>
            <ul className="space-y-3">
              <li><Link to="/brochure" className="text-brand-400 font-semibold hover:text-brand-300 text-sm transition-colors">✨ 프리미엄 마스터 소개서</Link></li>
              <li><Link to="/#consulting" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">ISO 27001 / 27701 인증 컨설팅</Link></li>
              <li><Link to="/#consulting" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">개인정보보호 컨설팅</Link></li>
              <li><Link to="/#advisory" className="text-slate-400 hover:text-brand-400 text-sm transition-colors">CISO 자문 서비스</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-6">고객 지원</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <span className="text-slate-500 mr-2">대표</span>
                <span className="text-slate-300">{(settings.company as any)?.ceo || '박배영'}</span>
              </li>
              <li>
                <span className="text-slate-500 mr-2">사업자등록번호</span>
                <span className="text-slate-300">{(settings.company as any)?.businessNumber || '502-86-05484'}</span>
              </li>
              <li>
                <span className="text-slate-500 mr-2">전화</span>
                <span className="text-slate-300">{(settings.company as any)?.phone || '053-964-3033'}</span>
              </li>
              <li>
                <span className="text-slate-500 mr-2">이메일</span>
                <span className="text-slate-300">{(settings.company as any)?.email || 'rothem@rothemsystem.com / paeyoungpark@gmail.com'}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} 로뎀시스템. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">개인정보처리방침</Link>
            <Link to="/profile" className="text-sm text-slate-500 hover:text-white transition-colors">CEO 프로필</Link>
            <Link to="/brochure" className="text-sm text-slate-500 hover:text-white transition-colors">프리미엄 마스터 소개서</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
