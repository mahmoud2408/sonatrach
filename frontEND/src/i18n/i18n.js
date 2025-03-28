import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importer vos fichiers de traduction
import fr from './translations/fr.json';
import en from './translations/en.json';
import es from './translations/es.json';

i18n
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next) // passe i18n à react-i18next
  .init({
    resources: {
      fr: {
        translation: fr
      },
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    fallbackLng: 'fr', // langue par défaut
    interpolation: {
      escapeValue: false // react déjà protège contre les XSS
    }
  });

export default i18n;
