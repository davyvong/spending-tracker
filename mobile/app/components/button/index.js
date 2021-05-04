import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';
import hexToRGB from 'utils/hex-to-rgb';

import ButtonComponent from './component';

const Button = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('buttonBackground'),
      },
      pressedContainer: {
        backgroundColor: hexToRGB(palette.get('buttonBackground'), 0.7),
      },
      text: {
        color: palette.get('buttonText'),
      },
    }),
    [palette],
  );

  return <ButtonComponent {...props} theme={theme} />;
};

export default Button;
