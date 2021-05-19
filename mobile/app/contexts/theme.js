import { getColorScheme } from 'constants/color-schemes';
import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';

const ThemeContext = createContext({});

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState('automatic');

  const value = useMemo(() => {
    let scheme = getColorScheme(colorScheme);
    if (!scheme) {
      scheme = getColorScheme('automatic');
    }
    return {
      ...scheme,
      setColorScheme,
    };
  }, [colorScheme, systemColorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContext;
