import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import WalletCardComponent from './component';

const WalletCard = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      walletCardGradient: ['transparent', palette.get('gradients.wallet-card')],
      walletCardPrimaryText: {
        color: palette.get('texts.wallet-primary'),
      },
      walletCardSecondaryText: {
        color: palette.get('texts.wallet-secondary'),
      },
    }),
    [palette],
  );

  return <WalletCardComponent {...props} color={palette.get('backgrounds.wallet-card')} theme={theme} />;
};

export default WalletCard;
