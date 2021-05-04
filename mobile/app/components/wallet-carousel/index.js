import useDimensions from 'hooks/dimensions';
import PropTypes from 'prop-types';
import React from 'react';

import WalletCarouselComponent from './component';

const WalletCarousel = ({ data, ...props }) => {
  const dimensions = useDimensions();

  return <WalletCarouselComponent {...props} data={data} dimensions={dimensions} />;
};

WalletCarousel.defaultProps = {
  data: [],
};

WalletCarousel.propTypes = {
  data: PropTypes.array,
};

export default WalletCarousel;
