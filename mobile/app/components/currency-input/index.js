import TextInput from 'components/text-input';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import CurrencyInputComponent from './component';

const CurrencyInput = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      defaultIcon: palette.get('icons.default'),
      currencyText: {
        color: palette.get('texts.normal'),
      },
      currencyValue: {
        borderLeftColor: palette.get('texts.input'),
      },
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
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
