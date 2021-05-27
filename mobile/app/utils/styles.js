import { Dimensions, PixelRatio } from 'react-native';

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

export const hexToRGB = (hex, alpha = null) => {
  const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!c) {
    return null;
  }
  const rgb = c
    .slice(1, 4)
    .map(h => Math.round(parseInt(h, 16) * alpha + 255 * (1 - alpha)))
    .join(',');
  if (alpha) {
    return `rgba(${rgb}, ${alpha})`;
  }
  return `rgb(${rgb})`;
};

// Source: https://github.com/react-native-elements/react-native-elements/blob/next/src/helpers/normalizeText.js

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
