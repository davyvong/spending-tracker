import Card from 'models/card';
import PropTypes from 'prop-types';
import React from 'react';

import CardSpendingDetailScreenComponent from './component';

const CardSpendingDetailScreen = ({ navigation, route, ...props }) => {
  const { card, endDate, startDate } = route.params;

  console.log({ card, endDate, startDate });

  return <CardSpendingDetailScreenComponent {...props} card={card} setNavigationOptions={navigation.setOptions} />;
};

CardSpendingDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      card: Card.propTypes.isRequired,
      endDate: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    }),
  }),
};

export default CardSpendingDetailScreen;
