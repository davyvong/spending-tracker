import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import DateInputComponent from './component';
import { getCalendarTheme } from './constants';

const DateInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      calendar: getCalendarTheme(palette),
      cancelButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
      iconColor: palette.get('defaultIcon'),
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
      },
    }),
    [palette],
  );

  const renderComponent = useCallback(inputProps => <DateInputComponent {...inputProps} theme={theme} />, [theme]);

  return <TextInput {...props} component={renderComponent} />;
};

DateInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
