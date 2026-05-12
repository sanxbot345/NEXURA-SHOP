import { useState, useEffect, createContext, useContext } from 'react';

interface SettingsContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  animations: boolean;
  setAnimations: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nexura_darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('nexura_notifications');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [animations, setAnimations] = useState(() => {
    const saved = localStorage.getItem('nexura_animations');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('nexura_darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-theme');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('nexura_notifications', JSON.stringify(notifications));
    if (notifications) {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            Notification.requestPermission();
        }
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nexura_animations', JSON.stringify(animations));
    if (!animations) {
      document.documentElement.classList.add('disable-animations');
    } else {
      document.documentElement.classList.remove('disable-animations');
    }
  }, [animations]);

  return (
    <SettingsContext.Provider value={{
      darkMode, setDarkMode,
      notifications, setNotifications,
      animations, setAnimations
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
