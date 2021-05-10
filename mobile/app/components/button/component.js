import Text from 'components/text';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, ViewPropTypes } from 'react-native';

import styles from './styles';

const ButtonComponent = ({ children, disabled, theme, title, style, ...props }) => {
  const getPressableStyle = useCallback(
    ({ pressed }) => {
      let pressableStyles = [styles.container];
      if (disabled) {
        pressableStyles.push(styles.disabled);
      }
      if (pressed) {
        pressableStyles.push(theme.pressedContainer);
      } else {
        pressableStyles.push(theme.container);
      }
      if (isFunction(style)) {
        pressableStyles = pressableStyles.concat(style({ pressed }));
      } else {
        pressableStyles = pressableStyles.concat(style);
      }
      return pressableStyles;
    },
    [disabled, style, theme],
  );

  return (
    <Pressable {...props} disabled={disabled} style={getPressableStyle}>
      {title ? <Text style={theme.text}>{title}</Text> : children}
    </Pressable>
  );
};

ButtonComponent.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: PropTypes.object,
  title: PropTypes.string,
};

export default ButtonComponent;
