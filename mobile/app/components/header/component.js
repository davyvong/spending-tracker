import Row from 'components/row';
import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';

import styles from './styles';

const HeaderComponent = ({ children, style, ...props }) => (
  <Row {...props} style={[styles.container, style]}>
    {children}
  </Row>
);

HeaderComponent.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default HeaderComponent;
