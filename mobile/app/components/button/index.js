import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';
import { hexToRGB } from 'utils/styles';

import ButtonComponent from './component';

const Button = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('backgrounds.primary-button'),
      },
      pressedContainer: {
        backgroundColor: hexToRGB(palette.get('backgrounds.primary-button'), 0.7),
      },
      text: {
        color: palette.get('texts.button'),
      },
    }),
    [palette],
  );

  return <ButtonComponent {...props} theme={theme} />;
};

export default Button;
