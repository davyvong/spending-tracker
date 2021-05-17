import hexToRGB from 'utils/hex-to-rgb';

const lightPalette = {
  appBackground: '#ffffff',
  buttonBackground: '#0984e3',
  inputBackground: hexToRGB('#5f6368', 0.25),
  modalBackground: '#ffffff',
  cancelBackground: hexToRGB('#000000', 0.25),
  pressedBackground: hexToRGB('#000000', 0.15),
  errorBackground: '#d63031',
  rowBackground: '#ffffff',
  tileBackground: hexToRGB('#5f6368', 0.25),
  selectedBackground: hexToRGB('#0984e3', 0.25),
  iconBackground: hexToRGB('#0984e3', 0.25),
  walletBackgroundColor: '#000000',

  appForeground: '#f7f9ff',

  buttonText: '#ffffff',
  errorText: '#d63031',
  mutedText: '#9e9ea7',
  normalText: '#000000',
  primaryText: '#0984e3',
  secondaryText: '#ff6b6b',
  positiveText: '#00b894',
  negativeText: '#d63031',
  inputText: '#9e9ea7',
  walletPrimaryText: '#ffffff',
  walletSecondaryText: hexToRGB('#ffffff', 0.75),

  activeIcon: '#0984e3',
  defaultIcon: '#9e9ea7',

  border: hexToRGB('#5f6368', 0.4),

  shadow: '#000000',

  primaryChart: '#0984e3',

  walletCardGradient: hexToRGB('#ffffff', 0.5),

  refreshControl: '#9e9ea7',
};

export default new Map(Object.entries(lightPalette));
