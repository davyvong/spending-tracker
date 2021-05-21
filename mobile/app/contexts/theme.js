import { getColorScheme } from 'constants/color-schemes';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider = ({ children }) => {
  const api = useAPI();
  const storage = useStorage();
  const [selectedTheme, setSelectedTheme] = useState('automatic');

  const value = useMemo(() => {
    let scheme = getColorScheme(selectedTheme);
    if (!scheme) {
      scheme = getColorScheme('automatic');
    }
    return Object.assign(scheme, { setTheme: setSelectedTheme });
  }, [selectedTheme]);

  const getThemeFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('account');
    const cachedAccount = await storage.getItem(storageKey);
    if (cachedAccount) {
      setSelectedTheme(cachedAccount.theme);
    }
  }, []);

  useEffect(() => {
    api.getAccount().then(getThemeFromStorage);
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContext;
