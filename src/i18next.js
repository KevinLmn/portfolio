import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/common.json";
import translationFR from "./locales/fr/common.json";

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["navigator", "htmlTag"],
    caches: ["localStorage"],
  },
});

export default i18n;
