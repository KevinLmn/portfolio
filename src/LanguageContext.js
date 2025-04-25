"use client";

import React, { createContext, useEffect, useState } from "react";
import { useAnalytics } from "./hooks/useAnalytics";
import i18n from "./i18next";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

export const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const { trackLanguageChange } = useAnalytics();

  useEffect(() => {
    i18n.changeLanguage(language);
    trackLanguageChange("en", language);
  }, [language, trackLanguageChange]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
