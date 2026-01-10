import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserType, UserSettings } from '../types';

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  userType: UserType.Standard,
  fontSize: 'normal',
  highContrast: false,
  soundEffects: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('suomi_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('suomi_settings', JSON.stringify(settings));
    
    // Apply visual classes to body
    const body = document.body;
    body.classList.remove('text-large', 'text-xlarge', 'high-contrast');
    
    if (settings.fontSize === 'large') body.classList.add('text-large');
    if (settings.fontSize === 'xlarge') body.classList.add('text-xlarge');
    if (settings.highContrast) body.classList.add('high-contrast');
    
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};