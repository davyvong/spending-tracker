import WalletCard from 'components/wallet-card';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';

const CardCarouselComponent = ({ data, dimensions, onChange, ItemComponent, ...props }) => {
  const onSnapToItem = useCallback(index => onChange(data[index], index), [data, onChange]);

  const renderItem = useCallback(({ index, item }) => <ItemComponent {...item} index={index} />, [ItemComponent]);

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

CardCarouselComponent.defaultProps = {
  data: [],
  ItemComponent: WalletCard,
};

CardCarouselComponent.propTypes = {
  data: PropTypes.array,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  ItemComponent: PropTypes.func,
};

export default CardCarouselComponent;
