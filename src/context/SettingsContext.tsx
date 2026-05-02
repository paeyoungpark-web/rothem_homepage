import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface ActivityPost {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

export interface CompanyInfo {
  ceo: string;
  businessNumber: string;
  phone: string;
  email: string;
  address: string;
}

interface SiteSettings {
  logoImage: string | null;
  profileImage: string | null;
  activities: ActivityPost[];
  company: CompanyInfo;
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateCompany: (info: CompanyInfo) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    let activities: ActivityPost[] = [];
    try {
      const stored = localStorage.getItem('site_activities');
      if (stored) {
        // Migration from old string[] to ActivityPost[]
        const parsed = JSON.parse(stored);
        if (parsed.length > 0 && typeof parsed[0] === 'string') {
          activities = parsed.map((img: string, idx: number) => ({
             id: `migrated-${idx}`,
             image: img,
             title: '',
             date: new Date().toISOString().split('T')[0],
             description: ''
          }));
        } else {
          activities = parsed;
        }
      }
    } catch(e) {}
    
    return {
      logoImage: localStorage.getItem('site_logo') || null,
      profileImage: localStorage.getItem('site_profile') || null,
      activities,
      company: {
        ceo: '박배영',
        businessNumber: '502-86-05484',
        phone: '053-964-3033',
        email: 'rothem@rothemsystem.com / paeyoungpark@gmail.com',
        address: '대구시 동구 율하동로 23길 48'
      }
    };
  });

  useEffect(() => {
    async function loadCompany() {
      try {
        const snap = await getDoc(doc(db, 'site_settings', 'company'));
        if (snap.exists()) {
          setSettings(prev => ({ ...prev, company: snap.data() as CompanyInfo }));
        }
      } catch (err) {}
    }
    loadCompany();
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (updated.logoImage !== prev.logoImage) {
        if (updated.logoImage) localStorage.setItem('site_logo', updated.logoImage);
        else localStorage.removeItem('site_logo');
      }
      if (updated.profileImage !== prev.profileImage) {
        if (updated.profileImage) localStorage.setItem('site_profile', updated.profileImage);
        else localStorage.removeItem('site_profile');
      }
      if (newSettings.activities !== undefined) {
        localStorage.setItem('site_activities', JSON.stringify(updated.activities));
      }
      return updated;
    });
  };

  const updateCompany = async (info: CompanyInfo) => {
    try {
      await setDoc(doc(db, 'site_settings', 'company'), info);
      setSettings(prev => ({ ...prev, company: info }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateCompany }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
