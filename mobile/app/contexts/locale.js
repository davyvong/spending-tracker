import 'moment/min/locales';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

const LocaleContext = createContext({});

export const LocaleConsumer = LocaleContext.Consumer;

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale);

  const client = useMemo(() => {
    i18n.locale = locale;
    const lowercaseLocale = locale.toLowerCase();
    if (moment.locales().includes(lowercaseLocale)) {
      moment.locale(lowercaseLocale);
    } else if (moment.locales().includes(lowercaseLocale.indexOf('-') > -1)) {
      moment.locale(lowercaseLocale.substring(0, lowercaseLocale.indexOf('-')));
    } else {
      moment.locale('en');
    }
    return i18n;
  }, [locale]);

  return <LocaleContext.Provider value={[client, setLocale]}>{children}</LocaleContext.Provider>;
};

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleContext;
