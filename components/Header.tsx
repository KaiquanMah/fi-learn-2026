import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UserType } from '../types';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { settings, updateSettings } = useApp();

  const toggleContrast = () => {
    updateSettings({ highContrast: !settings.highContrast });
  };

  const cycleFontSize = () => {
    const sizes: ('normal' | 'large' | 'xlarge')[] = ['normal', 'large', 'xlarge'];
    const nextIndex = (sizes.indexOf(settings.fontSize) + 1) % sizes.length;
    updateSettings({ fontSize: sizes[nextIndex] });
  };

  return (
    <header className="bg-finland-blue text-white p-4 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">SuomiStart 🇫🇮</Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={cycleFontSize}
            className="p-2 border rounded hover:bg-white hover:text-finland-blue transition-colors font-bold"
            aria-label="Change font size"
            title="Toggle Font Size"
          >
            A+
          </button>
          <button 
            onClick={toggleContrast}
            className="p-2 border rounded hover:bg-white hover:text-finland-blue transition-colors font-bold"
            aria-label="Toggle high contrast"
            title="Toggle High Contrast"
          >
            {settings.highContrast ? 'Standard' : 'Contrast'}
          </button>
          
          <div className="hidden md:block text-sm opacity-90">
            Profile: {settings.userType}
          </div>
        </div>
      </div>
    </header>
  );
};