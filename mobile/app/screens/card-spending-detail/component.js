import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import styles from './styles';

const CardSpendingDetailScreenComponent = ({ card, theme }) => {
  const data = [
    { x: 'Cats', y: 35 },
    { x: 'Dogs', y: 40 },
    { x: 'Birds', y: 55 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} StickyHeaderComponent={<Title>{card?.name}</Title>}>
        <View style={styles.chartContainer}>
          <VictoryPie
            data={data}
            height={300}
            labelComponent={
              <VictoryTooltip
                cornerRadius={5}
                flyoutPadding={{ bottom: 6, left: 9, right: 9, top: 6 }}
                flyoutStyle={{
                  ...theme.chartTooltip,
                  stroke: 0,
                }}
                pointerLength={0}
                style={theme.chartTooltipText}
              />
            }
            padding={24}
          />
        </View>
        <View>
          <Text>List of Categories and Spending</Text>
        </View>
      </ScrollView>
    </View>
  );
};

CardSpendingDetailScreenComponent.propTypes = {
  card: Card.propTypes,
  theme: PropTypes.object.isRequired,
};

export default CardSpendingDetailScreenComponent;
