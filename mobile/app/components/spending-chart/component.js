import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { Animated, View } from 'react-native';
import { normalizeText } from 'utils/styles';

import { daysOfWeek, initialAnimatedData } from './constants';
import styles from './styles';

const SpendingChartComponent = ({ data, maxSpent, theme }) => {
  const [locale] = useLocale();
  const animatedData = useRef(initialAnimatedData);

  const renderBar = useCallback(
    (item, index) => {
      if (item.debit === 0) {
        return <View key={item.date} style={styles.barColumn} />;
      }
      const maxHeight = maxSpent === 0 ? 0 : styles.chartArea.height - normalizeText(12) - 6;
      Animated.timing(animatedData.current[index], {
        duration: 300,
        toValue: (item.debit / maxSpent) * maxHeight,
        useNativeDriver: false,
      }).start();
      return (
        <View key={item.date} style={styles.barColumn}>
          <Text style={styles.barLabel}>{locale.toCurrency(item.debit, { precision: 0, unit: '' })}</Text>
          <Animated.View style={[styles.filledBar, theme.filledBar, { height: animatedData.current[index] }]} />
        </View>
      );
    },
    [locale, maxSpent],
  );

  const renderXLabel = useCallback(
    item => {
      const day = new Date(item.date).getUTCDay();
      if (!daysOfWeek[day]) {
        return null;
      }
      return (
        <Text key={item.date} style={styles.xLabel}>
          {locale.t(daysOfWeek[day])}
        </Text>
      );
    },
    [locale],
  );

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>{data.map(renderBar)}</View>
      <View style={[styles.xAxis, theme.xAxis]}>{data.map(renderXLabel)}</View>
    </View>
  );
};

SpendingChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  maxSpent: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SpendingChartComponent;
