import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          Übersicht: "Overview",
          Vorderseite: "Front",
          Rückseite: "Back",
          otherLanguage: "Deutsch",
          "1945 und heute?": "1945 and today?",
          "Welcome to React": "Welcome to React and react-i18next",
        },
      },
      de: {
        translations: {
          otherLanguage: "English",
          "Data for lorem ipsum": "Data for lorem ipsum",
          "Start the filling process": "Befüllvorgang starten",
        },
      },
    },
    fallbackLng: "de",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
