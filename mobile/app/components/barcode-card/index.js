import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import BarcodeCardComponent from './component';

const BarcodeCard = props => {
  const { palette } = useTheme();
  const dimensions = useWindowDimensions();
  const [isFlipped, setIsFlipped] = useState(false);

  const theme = useMemo(
    () => ({
      card: {
        backgroundColor: palette.get('backgrounds.wallet-card'),
      },
      cardBack: {
        backgroundColor: palette.get('backgrounds.barcode'),
      },
      cardGradient: ['transparent', palette.get('gradients.wallet-card')],
      cardPrimaryText: {
        color: palette.get('texts.wallet-primary'),
      },
      cardSecondaryText: {
        color: palette.get('texts.wallet-secondary'),
      },
      cardBarcode: {
        background: palette.get('backgrounds.barcode'),
        line: palette.get('lines.barcode'),
      },
    }),
    [palette],
  );

  const toggleFlipped = useCallback(() => {
    setIsFlipped(prevState => !prevState);
  }, []);

  return (
    <BarcodeCardComponent
      {...props}
      dimensions={dimensions}
      isFlipped={isFlipped}
      theme={theme}
      toggleFlipped={toggleFlipped}
    />
  );
};

export default BarcodeCard;
