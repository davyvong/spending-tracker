import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

const ScrollViewComponent = ({ children, renderStickyHeader, scrollReachedTop, theme, ...props }) => {
  const headerStyle = useMemo(() => {
    const baseHeaderStyle = [styles.headerContent, theme.headerContent];
    if (!scrollReachedTop) {
      return baseHeaderStyle.concat([styles.headerShadow, theme.headerShadow]);
    }
    return baseHeaderStyle;
  }, [scrollReachedTop, theme]);

  return (
    <View style={styles.container}>
      {renderStickyHeader && (
        <View style={styles.header}>
          <View style={headerStyle}>{renderStickyHeader()}</View>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
        {...props}
        scrollEventThrottle={200}
      >
        {children}
      </ScrollView>
    </View>
  );
};

ScrollViewComponent.propTypes = {
  children: PropTypes.node,
  renderStickyHeader: PropTypes.func,
  scrollReachedTop: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ScrollViewComponent;
