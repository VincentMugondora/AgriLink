import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import sn from './locales/sn.json';
import nd from './locales/nd.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sn: { translation: sn },
      nd: { translation: nd },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
