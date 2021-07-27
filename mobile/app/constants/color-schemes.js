import darkPalette from 'palettes/dark';
import lightPalette from 'palettes/light';
import { Appearance } from 'react-native-appearance';

const colorSchemeMap = {
  automatic: {
    id: 'automatic',
    name: 'common.color-schemes.automatic',
  },
  dark: {
    id: 'dark',
    name: 'common.color-schemes.dark',
    palette: darkPalette,
    statusBar: 'light',
  },
  light: {
    id: 'light',
    name: 'common.color-schemes.light',
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
