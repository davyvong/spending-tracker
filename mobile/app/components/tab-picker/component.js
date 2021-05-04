import Text from 'components/text';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const TabPickerComponent = ({ onPress, options, theme, value }) => {
  const renderOption = useCallback(
    option => {
      const active = option.value === value;
      return (
        <Pressable
          disabled={active}
          key={option.value}
          onPress={() => onPress(option)}
          style={[styles.option, active && theme.optionActive]}
        >
          <Text style={[styles.optionDefaultText, active && theme.optionActiveText]}>{option.label}</Text>
        </Pressable>
      );
    },
    [onPress, theme, value],
  );

  return <View style={styles.container}>{options.map(renderOption)}</View>;
};

TabPickerComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  theme: PropTypes.object.isRequired,
  value: PropTypes.string,
};

export default TabPickerComponent;
