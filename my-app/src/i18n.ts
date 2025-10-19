import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationBG from "./locales/bg/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  bg: {
    translation: translationBG,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "bg",
  fallbackLng: "bg",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
