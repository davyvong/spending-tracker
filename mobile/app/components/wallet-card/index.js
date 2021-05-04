import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import WalletCardComponent from './component';

const WalletCard = ({ color, ...props }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      walletCardGradient: ['transparent', palette.get('walletCardGradient')],
      walletCardPrimaryText: {
        color: palette.get('walletPrimaryText'),
      },
      walletCardSecondaryText: {
        color: palette.get('walletSecondaryText'),
      },
    }),
    [palette],
  );

  return <WalletCardComponent {...props} color={color || palette.get('walletBackgroundColor')} theme={theme} />;
};

WalletCard.propTypes = {
  color: PropTypes.string,
};

export default WalletCard;
