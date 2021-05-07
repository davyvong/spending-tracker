import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import CurrencyInputComponent from './component';

const CurrencyInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      currencyText: {
        color: palette.get('normalText'),
      },
      currencyValue: {
        borderLeftColor: palette.get('inputText'),
      },
      iconColor: palette.get('defaultIcon'),
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
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

  const renderComponent = useCallback(inputProps => <CurrencyInputComponent {...inputProps} theme={theme} />, [theme]);

  return <TextInput {...props} component={renderComponent} />;
};

CurrencyInput.defaultProps = {
  currencies: [],
};

CurrencyInput.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
};

export default CurrencyInput;
