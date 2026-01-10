import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export const ApiKeyModal = () => {
  const { settings, updateSettings } = useApp();
  const [key, setKey] = useState('');

  if (settings.apiKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-finland-blue">Welcome to SuomiStart</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          To enable the AI tutor features, please enter your Google Gemini API Key.
          This key is stored locally in your browser.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter API Key"
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-finland-blue outline-none text-black"
        />
        <button
          onClick={() => updateSettings({ apiKey: key })}
          disabled={!key}
          className="w-full bg-finland-blue text-white py-3 rounded-lg font-bold hover:bg-finland-dark disabled:opacity-50"
        >
          Start Learning
        </button>
        <p className="mt-4 text-xs text-gray-500">
          Get a key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline">aistudio.google.com</a>
        </p>
      </div>
    </div>
  );
};