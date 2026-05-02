import { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivityPost {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
}

interface SiteSettings {
  logoImage: string | null;
  profileImage: string | null;
  activities: ActivityPost[];
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
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
    };
  });

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

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
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
