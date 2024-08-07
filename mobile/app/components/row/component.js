import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';

const RowComponent = ({ children, style, ...props }) => (
  <View {...props} style={[styles.container, style]}>
    {children}
  </View>
);

RowComponent.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default RowComponent;
