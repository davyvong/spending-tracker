import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const ScrollViewComponent = ({ children, contentContainerStyle, StickyHeaderComponent, ...props }) => (
  <View style={styles.container}>
    {StickyHeaderComponent && <View style={styles.header}>{StickyHeaderComponent}</View>}
    <ScrollView
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
      style={styles.scrollView}
      {...props}
      scrollEventThrottle={200}
    >
      {children}
    </ScrollView>
  </View>
);

ScrollViewComponent.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: ViewPropTypes.style,
  StickyHeaderComponent: PropTypes.node,
};

export default ScrollViewComponent;
