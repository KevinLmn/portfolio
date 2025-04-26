"use client";

import React, { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAnalytics } from "./hooks/useAnalytics";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("fr");
  const { trackLanguageChange } = useAnalytics();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    trackLanguageChange(currentLanguage, language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
