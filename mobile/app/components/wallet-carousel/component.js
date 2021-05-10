import WalletCard from 'components/wallet-card';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';

const WalletCarouselComponent = ({ data, dimensions, onChange, ...props }) => {
  const onSnapToItem = useCallback(index => onChange(data[index]), [data, onChange]);

  const renderItem = useCallback(({ index, item }) => <WalletCard {...item} index={index} />, []);

  return (
    <Carousel
      data={data}
      itemWidth={dimensions.width - 48}
      onSnapToItem={onSnapToItem}
      renderItem={renderItem}
      sliderWidth={dimensions.width}
      {...props}
    />
  );
};

WalletCarouselComponent.defaultProps = {
  data: [],
};

WalletCarouselComponent.propTypes = {
  data: PropTypes.array,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};

export default WalletCarouselComponent;
