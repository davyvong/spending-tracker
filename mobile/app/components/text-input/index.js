import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import TextInputComponent from './component';

const TextInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      inputComponent: {
        color: palette.get('normalText'),
        backgroundColor: palette.get('inputBackground'),
      },
      inputError: {
        color: palette.get('errorText'),
      },
      inputLabel: {
        color: palette.get('primaryText'),
      },
      inputPlaceholder: palette.get('inputText'),
    }),
    [palette],
  );

  return <TextInputComponent {...props} theme={theme} />;
};

TextInput.propTypes = {
  theme: PropTypes.object,
};

export default TextInput;
