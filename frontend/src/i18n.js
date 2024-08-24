import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '#locales';

const options = {
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
};

const getI18nextInstance = () => {
  const i18next = createInstance();

  i18next
    .use(initReactI18next)
    .init(options);

  return i18next;
};

const i18next = getI18nextInstance();

export default i18next;
