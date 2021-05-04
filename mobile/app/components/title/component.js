import Text from 'components/text';
import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';

import styles from './styles';

const TitleComponent = ({ children, style, ...props }) => (
  <Text {...props} style={[styles.title, style]}>
    {children}
  </Text>
);

TitleComponent.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default TitleComponent;
