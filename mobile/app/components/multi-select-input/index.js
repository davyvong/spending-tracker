import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import MultiSelectInputComponent from './component';

const MultiSelectInput = props => {
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
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
    }),
    [palette],
  );

  const renderComponent = useCallback(inputProps => <MultiSelectInputComponent {...inputProps} theme={theme} />, [
    theme,
  ]);

  return <TextInput {...props} component={renderComponent} />;
};

MultiSelectInput.defaultProps = {
  options: [],
};

MultiSelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
};

export default MultiSelectInput;
