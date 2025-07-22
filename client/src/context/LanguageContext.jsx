import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    login: 'Login',
    register: 'Register',
    about: 'About',
    guidance: 'Guidance',
    colleges: 'Colleges',
    support: 'Support',
    roadmap: 'Your Roadmap',
    education: 'Education Info',
  },
  hi: {
    login: 'लॉगिन',
    register: 'रजिस्टर',
    about: 'हमारे बारे में',
    guidance: 'मार्गदर्शन',
    colleges: 'कॉलेज',
    support: 'सहायता',
    roadmap: 'आपका रोडमैप',
    education: 'शैक्षिक जानकारी',
  },
  bn: {
    login: 'লগইন',
    register: 'রেজিস্টার',
    about: 'আমাদের সম্পর্কে',
    guidance: 'গাইডেন্স',
    colleges: 'কলেজ',
    support: 'সাপোর্ট',
    roadmap: 'আপনার রোডম্যাপ',
    education: 'শিক্ষাগত তথ্য',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored) setLang(stored);
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
