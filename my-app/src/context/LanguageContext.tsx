import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { useAuthedContext } from "./AuthContext";

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const { preferences } = useAuthedContext();
  const [language, setLanguage] = useState<string>(() => {
    const storedLanguage =
      preferences.language || localStorage.getItem("language");
    console.log(storedLanguage);
    return storedLanguage ? storedLanguage : "en";
  });
  useEffect(() => {
    const storedLanguage =
      preferences?.language || localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
  }, [preferences?.language]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language, i18n]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};

export default LanguageProvider;
