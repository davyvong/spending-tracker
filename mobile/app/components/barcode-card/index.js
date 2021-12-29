import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import BarcodeCardComponent from './component';

const BarcodeCard = props => {
  const { palette } = useTheme();
  const dimensions = useWindowDimensions();

  const theme = useMemo(
    () => ({
      card: {
        backgroundColor: palette.get('backgrounds.wallet-card'),
      },
      cardBarcode: {
        background: palette.get('backgrounds.barcode'),
        line: palette.get('lines.barcode'),
      },
      cardGradient: ['transparent', palette.get('gradients.wallet-card')],
      cardText: {
        color: palette.get('texts.wallet-primary'),
      },
      defaultIcon: palette.get('icons.default'),
    }),
    [palette],
  );

  return <BarcodeCardComponent {...props} dimensions={dimensions} theme={theme} />;
};

export default BarcodeCard;
