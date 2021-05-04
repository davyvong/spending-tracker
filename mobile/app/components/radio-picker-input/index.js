import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import RadioPickerInputComponent from './component';

const RadioPickerInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      iconColor: palette.get('inputText'),
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
      },
      optionText: {
        color: palette.get('normalText'),
      },
      cancelButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
    }),
    [palette],
  );

  const renderComponent = useCallback(inputProps => <RadioPickerInputComponent {...inputProps} theme={theme} />, [
    theme,
  ]);

  return <TextInput {...props} component={renderComponent} />;
};

RadioPickerInput.defaultProps = {
  options: [],
};

RadioPickerInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
};

export default RadioPickerInput;
