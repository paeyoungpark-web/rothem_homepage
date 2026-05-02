import { useState, useEffect } from 'react';
import { Menu, X, Globe, LogIn, LogOut, User, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { settings } = useSettings();

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

  const navLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.contact'), href: '/#contact' },
    { name: t('nav.profile'), href: '/profile' }
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-1 group pb-1">
              {settings.logoImage ? (
                <img src={settings.logoImage} alt="rothemsystem logo" className="h-10 object-contain" />
              ) : (
                <>
                  <div className="flex items-end tracking-tighter italic">
                    <span className="text-[#E60012] text-3xl font-black">R</span>
                    <span className="text-[#004EA2] text-3xl font-black -ml-1">O</span>
                  </div>
                  <span className={`text-xl tracking-tight font-bold transition-colors ${isScrolled ? 'text-slate-900 group-hover:text-blue-600' : 'text-white'}`}>
                    rothemsystem
                  </span>
                </>
              )}
            </a>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-blue-600 ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}>
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              <button 
                onClick={toggleLanguage}
                className={`flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}
              >
                <Globe size={18} />
                {i18n.language === 'ko' ? 'EN' : 'KR'}
              </button>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 text-sm font-medium ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-6 h-6 rounded-full" />
                    ) : (
                      <User size={18} />
                    )}
                    {user.displayName?.split(' ')[0]}
                  </div>
                  <button 
                    onClick={() => navigate('/settings')}
                    className={`flex items-center gap-1 text-sm font-medium hover:text-indigo-500 transition-colors ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}
                    title={t('nav.settings') || 'Settings'}
                  >
                    <Settings size={18} />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={`flex items-center gap-1 text-sm font-medium hover:text-red-500 transition-colors ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}
                  >
                    <LogOut size={18} />
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className={`flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  <LogIn size={18} />
                  {t('nav.login')}
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={isScrolled ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-800 hover:text-blue-600 hover:bg-slate-50">
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-800 hover:text-blue-600 hover:bg-slate-50"
            >
              <Globe size={20} />
              {i18n.language === 'ko' ? 'Switch to English' : '한국어로 변경'}
            </button>
            
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut size={20} />
                {t('nav.logout')}
              </button>
            ) : (
              <button 
                onClick={() => { navigate('/login'); setIsOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-slate-800 hover:text-blue-600 hover:bg-slate-50"
              >
                <LogIn size={20} />
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
