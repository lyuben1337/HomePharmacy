import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "@/i18n/locales/en-US/translation.json";
import translationUa from "@/i18n/locales/uk-UA/translation.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Locale = "uk-UA" | "en-US";

type LocaleContextType = {
  locale: Locale;
  toggleLocale: (Locale: Locale) => void;
};

const resources = {
  "uk-UA": { translation: translationUa },
  "en-US": { translation: translationEn },
};

const initI18n = async (locale: Locale) => {
  if (!locale) {
    locale = "uk-UA";
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: locale,
    fallbackLng: "uk-UA",
    interpolation: { escapeValue: false },
  });

  i18n.services.pluralResolver.addRule("uk-UA", {
    numbers: [0, 1, 2, 5],
    plurals: (n: number) => {
      const n10 = n % 10;
      const n100 = n % 100;
      if (n === 0) return 0;
      if (n === 1) return 1;
      if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return 2;
      return 5;
    },
  });
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: "uk-UA",
  toggleLocale: () => { },
});

export default function LocaleProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [locale, setLocale] = useState<Locale>("uk-UA");
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const getLocale = async () => {
      try {
        const savedLocale = (await AsyncStorage.getItem("locale")) as Locale;
        savedLocale && setLocale(savedLocale);
        await initI18n(savedLocale);
        setIsI18nInitialized(true);
      } catch (error) {
        console.log("Error loading Locale:", error);
      }
    };
    getLocale();
  }, []);

  const toggleLocale = async (newLocale: Locale) => {
    setLocale(newLocale);
    await initI18n(newLocale);
    await AsyncStorage.setItem("locale", newLocale);
  };

  if (!isI18nInitialized) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
