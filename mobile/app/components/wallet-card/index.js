import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import WalletCardComponent from './component';

const WalletCard = ({ color, ...props }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      walletCardGradient: ['transparent', palette.get('gradients.walletCard')],
      walletCardPrimaryText: {
        color: palette.get('texts.walletPrimary'),
      },
      walletCardSecondaryText: {
        color: palette.get('texts.walletSecondary'),
      },
    }),
    [palette],
  );

  return <WalletCardComponent {...props} color={color || palette.get('backgrounds.walletCard')} theme={theme} />;
};

WalletCard.propTypes = {
  color: PropTypes.string,
};

export default WalletCard;
