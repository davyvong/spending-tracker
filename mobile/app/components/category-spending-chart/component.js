import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { Animated, View } from 'react-native';
import { normalizeText } from 'utils/styles';

import styles from './styles';

export const initialAnimatedData = new Array(7).fill(null).map(() => new Animated.Value(0));

const CategorySpendingChartComponent = ({ data, maxSpent, theme }) => {
  const [locale] = useLocale();
  const animatedData = useRef(initialAnimatedData);

  const renderBar = useCallback(
    (item, index) => {
      if (item.amount === 0) {
        return <View key={item.categoryId} style={styles.barColumn} />;
      }
      const maxHeight = maxSpent === 0 ? 0 : styles.chartArea.height - normalizeText(12) - 6;
      Animated.timing(animatedData.current[index], {
        duration: 300,
        toValue: (item.amount / maxSpent) * maxHeight,
        useNativeDriver: false,
      }).start();
      return (
        <View key={item.categoryId} style={styles.barColumn}>
          <Text style={styles.barLabel}>{locale.toCurrency(item.amount, { precision: 0, unit: '' })}</Text>
          <Animated.View style={[styles.filledBar, theme.filledBar, { height: animatedData.current[index] }]} />
        </View>
      );
    },
    [locale, maxSpent],
  );

  const renderXLabel = useCallback(
    item => (
      <Text key={item.categoryId} style={styles.xLabel}>
        {item.categoryName}
      </Text>
    ),
    [locale],
  );

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>{data.map(renderBar)}</View>
      <View style={[styles.xAxis, theme.xAxis]}>{data.map(renderXLabel)}</View>
    </View>
  );
};

CategorySpendingChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  maxSpent: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CategorySpendingChartComponent;
