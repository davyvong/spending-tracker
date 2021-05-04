import Spacer from 'components/spacer';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Header = ({ isHeaderEmpty, renderLeft, renderRight }) => (
  <View style={[styles.container, isHeaderEmpty && styles.emptyContainer]}>
    {renderLeft()}
    <Spacer />
    {renderRight()}
  </View>
);

Header.propTypes = {
  isHeaderEmpty: PropTypes.bool.isRequired,
  renderLeft: PropTypes.func.isRequired,
  renderRight: PropTypes.func.isRequired,
};

export default Header;
