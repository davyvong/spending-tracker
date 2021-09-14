import CategoryRow from 'components/category-row';
import ScrollView from 'components/scroll-view';
import Title from 'components/title';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { View } from 'react-native';
import VictoryPie from 'victory-native/lib/components/victory-pie';
import VictoryTooltip from 'victory-native/lib/components/victory-tooltip';

import styles from './styles';

// Source: https://flatuicolors.com/palette/us
let colorScale = ['#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#fdcb6e', '#d63031', '#e17055', '#e84393'];

const CardSpendingDetailScreenComponent = ({ card, categorySpending, theme }) => {
  const renderSpending = useCallback(
    spending => <CategoryRow {...spending} currency={card.currency} key={spending.categoryId} />,
    [card],
  );

  return (
    <View style={styles.container}>
      <ScrollView StickyHeaderComponent={<Title>{card?.name}</Title>}>
        {categorySpending.length > 0 && (
          <Fragment>
            <View style={styles.chartContainer}>
              <VictoryPie
                colorScale={colorScale}
                data={categorySpending}
                height={200}
                innerRadius={50}
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    cornerRadius={5}
                    flyoutPadding={{ bottom: 6, left: 9, right: 9, top: 6 }}
                    flyoutStyle={{
                      ...theme.chartTooltip,
                      stroke: 0,
                    }}
                    pointerLength={0}
                    renderInPortal={false}
                    style={theme.chartTooltipText}
                  />
                }
                padding={{ bottom: 12 }}
              />
            </View>
            <View style={styles.spendingContainer}>{categorySpending.map(renderSpending)}</View>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

CardSpendingDetailScreenComponent.propTypes = {
  card: Card.propTypes,
  categorySpending: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      categoryId: PropTypes.string,
      transactionCount: PropTypes.number,
      x: PropTypes.string,
      y: PropTypes.number,
    }),
  ),
  theme: PropTypes.object.isRequired,
};

export default CardSpendingDetailScreenComponent;
