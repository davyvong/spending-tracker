import ScrollView from 'components/scroll-view';
import Title from 'components/title';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import styles from './styles';

const CardSpendingDetailScreenComponent = ({ card, setNavigationOptions }) => {
  useEffect(() => {
    // setNavigationOptions
  }, [setNavigationOptions]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} StickyHeaderComponent={<Title>{card?.name}</Title>}>
        {null}
      </ScrollView>
    </View>
  );
};

CardSpendingDetailScreenComponent.propTypes = {
  card: Card.propTypes,
  setNavigationOptions: PropTypes.func.isRequired,
};

export default CardSpendingDetailScreenComponent;
