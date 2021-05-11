import React from 'react';
import { useWindowDimensions } from 'react-native';

import WalletCarouselComponent from './component';

const WalletCarousel = props => {
  const dimensions = useWindowDimensions();

  return <WalletCarouselComponent {...props} dimensions={dimensions} />;
};

export default WalletCarousel;
