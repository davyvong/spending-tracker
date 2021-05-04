import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';
import { Text as RNText } from 'react-native';

import TextComponent from './component';
import styles from './styles';

const Text = ({ style, ...props }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      color: palette.get('normalText'),
    }),
    [palette],
  );

  return <TextComponent {...props} style={[styles.text, theme, style]} />;
};

Text.propTypes = {
  style: RNText.propTypes.style,
};

export default Text;
