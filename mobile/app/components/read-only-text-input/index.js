import TextInput from 'components/text-input';
import * as Clipboard from 'expo-clipboard';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import sleep from 'utils/sleep';

import ReadOnlyTextInputComponent from './component';

const ReadOnlyTextInput = props => {
  const { palette } = useTheme();
  const [pending, setPending] = useState(false);

  const copyToClipboard = useCallback(async () => {
    setPending(true);
    await sleep(100);
    Clipboard.setString(props.value);
    setPending(false);
  }, []);

  const theme = useMemo(
    () => ({
      defaultIcon: palette.get('icons.default'),
    }),
    [palette],
  );

  const renderComponent = useCallback(
    inputProps => (
      <ReadOnlyTextInputComponent {...inputProps} copyToClipboard={copyToClipboard} pending={pending} theme={theme} />
    ),
    [copyToClipboard, pending, theme],
  );

  return <TextInput {...props} component={renderComponent} />;
};

ReadOnlyTextInput.propTypes = {
  value: PropTypes.string,
};

export default ReadOnlyTextInput;
