import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import TextInputComponent from './component';

const TextInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      inputComponent: {
        color: palette.get('texts.normal'),
        backgroundColor: palette.get('backgrounds.input'),
      },
      inputError: {
        color: palette.get('texts.error'),
      },
      inputLabel: {
        color: palette.get('texts.primary'),
      },
      inputPlaceholder: palette.get('texts.input'),
    }),
    [palette],
  );

  return <TextInputComponent {...props} theme={theme} />;
};

TextInput.propTypes = {
  theme: PropTypes.object,
};

export default TextInput;
