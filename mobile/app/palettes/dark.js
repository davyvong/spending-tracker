import hexToRGB from 'utils/hex-to-rgb';

const darkPalette = {
  appBackground: '#000000',
  buttonBackground: '#0984e3',
  inputBackground: hexToRGB('#a09c97', 0.15),
  modalBackground: '#242423',
  cancelBackground: hexToRGB('#ffffff', 0.15),
  pressedBackground: hexToRGB('#ffffff', 0.1),
  errorBackground: '#d63031',
  rowBackground: '#000000',
  tileBackground: hexToRGB('#a09c97', 0.15),
  selectedBackground: hexToRGB('#0984e3', 0.15),
  iconBackground: hexToRGB('#0984e3', 0.15),
  walletBackgroundColor: '#ffffff',

  appForeground: '#f7f9ff',

  buttonText: '#000000',
  errorText: '#d63031',
  mutedText: '#616158',
  normalText: '#ffffff',
  primaryText: '#0984e3',
  secondaryText: '#ff6b6b',
  positiveText: '#00b894',
  negativeText: '#d63031',
  inputText: '#616158',
  walletPrimaryText: '#000000',
  walletSecondaryText: hexToRGB('#000000', 0.75),

  activeIcon: '#0984e3',
  defaultIcon: '#616158',

  border: hexToRGB('#a09c97', 0.25),

  shadow: '#000000',

  primaryChart: '#0984e3',

  walletCardGradient: hexToRGB('#000000', 0.5),

  refreshControl: '#0984e3',
};

export default new Map(Object.entries(darkPalette));
