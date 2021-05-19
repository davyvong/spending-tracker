import { getColorScheme } from 'constants/color-schemes';
import useCache from 'hooks/cache';
import PropTypes from 'prop-types';
import React, { createContext, useMemo } from 'react';

const ThemeContext = createContext({});

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider = ({ children }) => {
  const [cache] = useCache();

  const value = useMemo(() => {
    let scheme = getColorScheme(cache.account.theme);
    if (!scheme) {
      scheme = getColorScheme('automatic');
    }
    return scheme;
  }, [cache.account.theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContext;
