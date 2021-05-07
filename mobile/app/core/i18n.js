import * as Localization from 'expo-localization';
import { unflatten } from 'flat';
import i18n from 'i18n-js';
import en from 'translations/en.json';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;
i18n.locale = Localization.locale;

const setTranslations = () => {
  i18n.translations = {
    en: unflatten(en),
  };
};

setTranslations();

if (module.hot) {
  module.hot.accept(setTranslations);
}
