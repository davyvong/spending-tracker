import darkPalette from 'palettes/dark';
import lightPalette from 'palettes/light';
import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';

import { themeModes } from './constants';

const ThemeContext = createContext({});

export const ThemeConsumer = ThemeContext.Consumer;

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState(themeModes.light);

  const palette = useMemo(() => {
    switch (mode) {
      case themeModes.automatic:
        return colorScheme === 'dark' ? darkPalette : lightPalette;
      case themeModes.dark:
        return darkPalette;
      case themeModes.light:
        return lightPalette;
      default:
        return lightPalette;
    }
  }, [colorScheme, mode]);

  const name = useMemo(() => {
    if (mode === themeModes.automatic) {
      return colorScheme === 'dark' ? themeModes.dark : themeModes.light;
    }
    return mode;
  }, [colorScheme, mode]);

  const value = {
    mode,
    name,
    palette,
    setMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeContext;
