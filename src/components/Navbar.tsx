import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn, LogOut, User, Settings, Sun, Moon, ChevronDown, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { KAKAO_CHANNEL_URL } from '../lib/constants';

type DropdownItem = { name: string; href: string };
type NavItem = {
  name: string;
  href?: string;
  children?: DropdownItem[];
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { settings } = useSettings();
  const { theme, toggleTheme } = useTheme();

  // Enforce white background header on all pages except the homepage
  const isHomePage = location.pathname === '/';
  const forceLight = !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navLinks: NavItem[] = [
    {
      name: '보안 솔루션',
      children: [
        { name: '취급제품', href: '/#solutions' },
        { name: '도입사례', href: '/#case-studies' },
        { name: '견적요청', href: '/#contact' }
      ]
    },
    {
      name: '컨설팅',
      children: [
        { name: '💎 컨설팅 패키지 안내', href: '/consulting' },
        { name: '✨ 프리미엄 마스터 소개서', href: '/brochure' },
        { name: 'ISO 27001', href: '/#services' },
        { name: 'ISO 27701', href: '/#services' },
        { name: '개인정보보호', href: '/#services' },
        { name: '보안감사', href: '/#services' }
      ]
    },
    {
      name: '자문 서비스',
      children: [
        { name: 'CISO 자문', href: '/#advisory' },
        { name: '경영진 자문', href: '/#advisory' },
        { name: '법률 자문', href: '/#advisory' }
      ]
    },
    {
      name: '회사소개',
      children: [
        { name: 'CEO 프로필', href: '/profile' },
        { name: '수상·인증', href: '/#certifications' },
        { name: '고객사', href: '/#clients' }
      ]
    },
    { name: '보안 인사이츠', href: '/insights' },
    { name: '문의하기', href: '/inquiries' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const useLightMode = isScrolled || forceLight;
  const TopNavLayout = useLightMode ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-4' : 'bg-transparent py-6';
  const TextColor = useLightMode ? 'text-slate-900 hover:text-brand-500' : 'text-white hover:text-brand-100';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${TopNavLayout}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group pb-1">
              {settings.logoImage ? (
                <img src={settings.logoImage} alt="로뎀시스템 로고" className="h-10 object-contain" />
              ) : (
                <>
                  <div className="flex items-end tracking-tighter italic">
                    <span className="text-brand-500 text-3xl font-black">R</span>
                    <span className="text-brand-400 text-3xl font-black -ml-1">O</span>
                  </div>
                  <span className={`text-xl tracking-tight font-bold transition-colors ${TextColor}`}>
                    rothemsystem
                  </span>
                </>
              )}
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group py-4"
              >
                {link.href ? (
                  <Link to={link.href} className={`flex items-center gap-1 text-sm font-semibold transition-colors ${TextColor}`}>
                    {link.name}
                  </Link>
                ) : (
                  <button className={`flex items-center gap-1 text-sm font-semibold transition-colors ${TextColor} focus:outline-none`}>
                    {link.name}
                    {link.children && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                  </button>
                )}

                {/* Dropdown menu */}
                {link.children && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="w-52 bg-white border-2 border-slate-200 rounded-xl shadow-2xl py-2 ring-1 ring-black/5 relative">
                      {/* Arrow indicator */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l-2 border-t-2 border-slate-200 rotate-45 z-10"></div>
                      
                      <div className="relative z-20">
                        {link.children.map((child, idx) => (
                          <Link 
                            key={child.name} 
                            to={child.href}
                            className={`relative block px-4 py-3 text-sm text-slate-800 hover:bg-brand-50 hover:text-brand-500 hover:pl-5 font-semibold transition-all ${
                              idx !== link.children!.length - 1 ? 'border-b border-slate-100' : ''
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
            
          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko')}
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors border ${useLightMode ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-white/30 text-white hover:bg-white/10'}`}
            >
              <Globe size={14} />
              {i18n.language === 'ko' ? 'EN' : 'KR'}
            </button>

            <a 
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90 transition-colors shadow-sm"
            >
              <MessageCircle size={14} fill="#000" />
              카카오톡 상담
            </a>
            
            {user ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 text-sm font-medium ${TextColor}`}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-7 h-7 rounded-full border border-white/20 shadow-sm" />
                  ) : (
                    <User size={20} />
                  )}
                </button>
                <div className="absolute right-0 top-full mt-4 w-44 bg-white border-2 border-slate-200 rounded-xl shadow-2xl py-2 ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {user.email && ['paeyoung.park@gmail.com', 'rothem@rothemsystem.com', 'leeyw@rothemsystem.com'].includes(user.email) && (
                    <button onClick={() => navigate('/admin')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-500 font-semibold border-b border-slate-100">
                      설정(Admin)
                    </button>
                  )}
                  <button onClick={toggleTheme} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-500 font-semibold flex items-center justify-between border-b border-slate-100">
                    다크모드 {theme === 'dark' ? <Sun size={14}/> : <Moon size={14}/>}
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold">
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${TextColor}`}
              >
                <LogIn size={16} />
                로그인
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <a 
              href={KAKAO_CHANNEL_URL}
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FEE500] text-black"
            >
              <MessageCircle size={16} fill="#000" />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className={useLightMode ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl absolute w-full left-0 top-full border-t border-slate-100 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.href ? (
                  <Link to={link.href} onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900">
                    {link.name}
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <span className="block text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">{link.name}</span>
                    <div className="pl-4 grid grid-cols-2 gap-y-3 gap-x-4">
                      {link.children?.map(child => (
                        <Link key={child.name} to={child.href} onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-700 hover:text-brand-500">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              {user ? (
                 <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm">
                   <LogOut size={16} /> 로그아웃
                 </button>
              ) : (
                <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm">
                   <LogIn size={16} /> 로그인
                </button>
              )}
               <button onClick={toggleTheme} className="flex items-center justify-center gap-2 py-2.5 bg-brand-50 text-brand-500 rounded-lg font-bold text-sm">
                 {theme === 'dark' ? <><Sun size={16}/> 라이트 모드</> : <><Moon size={16}/> 다크 모드</>}
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

