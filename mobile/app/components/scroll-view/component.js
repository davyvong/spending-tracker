import { useScrollToTop } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { ScrollView, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const ScrollViewComponent = ({ children, contentContainerStyle, StickyHeaderComponent, ...props }) => {
  const ref = useRef();

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      {StickyHeaderComponent && <View style={styles.header}>{StickyHeaderComponent}</View>}
      <ScrollView
        bounces={false}
        contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
        style={styles.scrollView}
        {...props}
        ref={ref}
        scrollEventThrottle={200}
      >
        {children}
      </ScrollView>
    </View>
  );
};

ScrollViewComponent.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: ViewPropTypes.style,
  StickyHeaderComponent: PropTypes.node,
};

export default ScrollViewComponent;
