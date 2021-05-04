import Text from 'components/text';
import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

const TextInputComponent = ({
  component: Component,
  containerStyle,
  error,
  inputRef,
  label,
  required,
  placeholder,
  style,
  theme,
  value,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.inputLabel, theme.inputLabel]}>
      {label}
      {required && ' *'}
    </Text>
    <Component
      {...props}
      placeholder={placeholder || label}
      placeholderTextColor={theme.inputPlaceholder}
      ref={inputRef}
      required={required}
      style={[styles.inputComponent, theme.inputComponent, style]}
      underlineColorAndroid="transparent"
      value={value}
    />
    {error && <Text style={[styles.inputError, theme.inputError]}>{error}</Text>}
  </View>
);

TextInputComponent.defaultProps = {
  component: TextInput,
  editable: true,
  error: null,
  label: '',
  required: false,
};

TextInputComponent.propTypes = {
  component: PropTypes.any,
  containerStyle: PropTypes.object,
  editable: PropTypes.bool,
  error: PropTypes.string,
  inputRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.any,
  theme: PropTypes.object.isRequired,
  value: PropTypes.any,
};

export default TextInputComponent;
