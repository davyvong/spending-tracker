import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import RadioPickerInputComponent from './component';

const RadioPickerInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      defaultIcon: palette.get('icons.default'),
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      optionText: {
        color: palette.get('texts.normal'),
      },
      cancelButton: {
        backgroundColor: palette.get('backgrounds.secondaryButton'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondaryButtonPressed'),
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
