export const defaultBarcodeFormat = 'CODE128';

export const barcodeFormatMap = {
  CODE39: {
    id: 'CODE39',
    name: 'CODE39',
  },
  CODE128: {
    id: 'CODE128',
    name: 'CODE128',
  },
  EAN13: {
    id: 'EAN13',
    name: 'EAN13',
  },
  EAN8: {
    id: 'EAN8',
    name: 'EAN8',
  },
  UPC: {
    id: 'UPC',
    name: 'UPC',
  },
  UPCE: {
    id: 'UPCE',
    name: 'UPCE',
  },
  ITF14: {
    id: 'ITF14',
    name: 'ITF14',
  },
  MSI: {
    id: 'MSI',
    name: 'MSI',
  },
  pharmacode: {
    id: 'pharmacode',
    name: 'pharmacode',
  },
  codabar: {
    id: 'codabar',
    name: 'codabar',
  },
};

export const getBarcodeFormat = barcodeFormat => barcodeFormatMap[barcodeFormat];

export const getSupportedBarcodeFormats = () => Object.keys(barcodeFormatMap);

export const barcodeFormatOptions = getSupportedBarcodeFormats().map(format => {
  const barcodeFormat = getBarcodeFormat(format);
  return {
    label: barcodeFormat.name,
    value: barcodeFormat.id,
  };
});
