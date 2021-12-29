import React from 'react';
import { useWindowDimensions } from 'react-native';

import CardCarouselComponent from './component';

const CardCarousel = props => {
  const dimensions = useWindowDimensions();

  return <CardCarouselComponent {...props} dimensions={dimensions} />;
};

export default CardCarousel;
