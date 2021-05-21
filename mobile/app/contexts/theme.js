import { getColorScheme } from 'constants/color-schemes';
import useStorage from 'hooks/storage';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider = ({ children }) => {
  const storage = useStorage();
  const [selectedTheme, setSelectedTheme] = useState('automatic');

  const value = useMemo(() => {
    let scheme = getColorScheme(selectedTheme);
    if (!scheme) {
      scheme = getColorScheme('automatic');
    }
    return Object.assign(scheme, { setTheme: setSelectedTheme });
  }, [selectedTheme]);

  useEffect(() => {
    const setAccountTheme = account => setSelectedTheme(account.theme);
    storage.getItem('account').then(setAccountTheme);
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContext;
