import Text from 'components/text';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const MonthPickerComponent = ({ onPress, options, theme, value }) => {
  const renderOption = useCallback(
    option => {
      const active = option === value;
      const date = moment(option);
      return (
        <Pressable disabled={active} key={option} onPress={() => onPress(option)} style={styles.option}>
          <Text style={[styles.optionYearText, theme.optionYearText]}>{date.format('YYYY')}</Text>
          <View style={[styles.optionMonth, active && theme.optionMonthActive]}>
            <Text style={[styles.optionMonthText, active && theme.optionMonthActiveText]}>{date.format('MMM')}</Text>
          </View>
        </Pressable>
      );
    },
    [onPress, theme, value],
  );

  return <View style={styles.container}>{options.map(renderOption)}</View>;
};

MonthPickerComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.object.isRequired,
  value: PropTypes.string,
};

export default MonthPickerComponent;
