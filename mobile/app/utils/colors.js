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
