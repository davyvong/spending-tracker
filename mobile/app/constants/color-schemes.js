import darkPalette from 'palettes/dark';
import lightPalette from 'palettes/light';
import { Appearance } from 'react-native-appearance';

const colorSchemeMap = {
  automatic: {
    id: 'automatic',
    name: 'System Theme',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    palette: darkPalette,
    statusBar: 'light',
  },
  light: {
    id: 'light',
    name: 'Light',
    palette: lightPalette,
    statusBar: 'dark',
  },
};

export const getColorScheme = scheme => {
  if (scheme === 'automatic') {
    return {
      ...colorSchemeMap[Appearance.getColorScheme()],
      ...colorSchemeMap[scheme],
    };
  }
  return colorSchemeMap[scheme];
};

export const getSupportedColorSchemes = () => ['automatic', 'light', 'dark'];

export const colorSchemeOptions = getSupportedColorSchemes().map(colorScheme => {
  const scheme = getColorScheme(colorScheme);
  return {
    label: scheme.name,
    value: scheme.id,
  };
});
