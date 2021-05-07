import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import MultiSelectInputComponent from './component';

const MultiSelectInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      iconColor: palette.get('defaultIcon'),
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
