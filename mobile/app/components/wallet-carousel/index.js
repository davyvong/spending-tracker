import useDimensions from 'hooks/dimensions';
import React from 'react';

import WalletCarouselComponent from './component';

const WalletCarousel = props => {
  const dimensions = useDimensions();

  return <WalletCarouselComponent {...props} dimensions={dimensions} />;
};

export default WalletCarousel;
