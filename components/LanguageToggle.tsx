
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'fr' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'ar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
        }`}
      >
        AR
      </button>
    </div>
  );
};

export default LanguageToggle;
