import Text from 'components/text';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, ViewPropTypes } from 'react-native';

import styles from './styles';

const ButtonComponent = ({ children, theme, title, style, ...props }) => {
  const getPressableStyle = useCallback(
    ({ pressed }) => {
      if (isFunction(style)) {
        return [styles.container, theme.container, style({ pressed })];
      }
      return pressed ? [styles.container, theme.pressedContainer, style] : [styles.container, theme.container, style];
    },
    [style, theme],
  );

  return (
    <Pressable {...props} style={getPressableStyle}>
      {title ? <Text style={theme.text}>{title}</Text> : children}
    </Pressable>
  );
};

ButtonComponent.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  style: ViewPropTypes.style,
  theme: PropTypes.object,
  title: PropTypes.string,
};

export default ButtonComponent;
