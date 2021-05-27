// Source: https://github.com/react-native-elements/react-native-elements/blob/next/src/helpers/normalizeText.js

import { Dimensions, PixelRatio } from 'react-native';

export const normalizeText = size => {
  const pixelRatio = PixelRatio.get();
  const { height, width } = Dimensions.get('window');

  if (pixelRatio >= 2 && pixelRatio < 3) {
    if (width < 360) {
      return size * 0.95;
    }
    if (height < 667) {
      return size;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.15;
    }
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    if (width <= 360) {
      return size;
    }
    if (height < 667) {
      return size * 1.15;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.2;
    }
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    if (width <= 360) {
      return size;
    }
    if (height < 667) {
      return size * 1.2;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.25;
    }
    return size * 1.4;
  }
  return size;
};
