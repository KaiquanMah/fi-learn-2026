import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UserType } from '../types';

export const Settings = () => {
  const { settings, updateSettings } = useApp();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Settings & Profile</h1>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Learner Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(UserType) as Array<keyof typeof UserType>).map((key) => (
            <button
              key={key}
              onClick={() => updateSettings({ userType: UserType[key] })}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                settings.userType === UserType[key]
                  ? 'border-finland-blue bg-blue-50 dark:bg-blue-900/30 ring-2 ring-finland-blue'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="font-bold">{UserType[key]}</div>
              <div className="text-xs text-gray-500 mt-1">
                {key === 'Standard' && 'Balanced learning path'}
                {key === 'Elderly' && 'Clear text, slower pace'}
                {key === 'ADHD' && 'Gamified, short bursts'}
                {key === 'VisuallyImpaired' && 'Screen-reader optimized'}
                {key === 'Traveler' && 'Focus on survival phrases'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Accessibility & Preferences</h2>
        
        <div className="mb-6">
            <label className="block mb-2 font-medium">Font Size</label>
            <div className="flex gap-2">
                {['normal', 'large', 'xlarge'].map((size) => (
                    <button
                        key={size}
                        onClick={() => updateSettings({ fontSize: size as any })}
                        className={`px-4 py-2 rounded border ${settings.fontSize === size ? 'bg-finland-blue text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                    >
                        {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b dark:border-slate-700">
            <label className="font-medium">High Contrast Mode</label>
            <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.highContrast ? 'bg-finland-blue' : 'bg-gray-300'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${settings.highContrast ? 'translate-x-6' : ''}`} />
            </button>
        </div>

        <div className="flex items-center justify-between">
            <div>
                <label className="font-medium block">Sound Effects</label>
                <p className="text-xs text-gray-500">Play sounds for correct/wrong answers</p>
            </div>
            <button
                onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.soundEffects ? 'bg-green-500' : 'bg-gray-300'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${settings.soundEffects ? 'translate-x-6' : ''}`} />
            </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        API Key: {settings.apiKey ? '••••••••' + settings.apiKey.slice(-4) : 'Not Set'} <br/>
        <button onClick={() => updateSettings({ apiKey: '' })} className="text-red-400 underline mt-2">Clear API Key</button>
      </div>
    </div>
  );
};