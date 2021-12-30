import TextInput from 'components/text-input';
import * as Clipboard from 'expo-clipboard';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import sleep from 'utils/sleep';

import ReadOnlyTextInputComponent from './component';

const ReadOnlyTextInput = props => {
  const { palette } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    Clipboard.setString(props.value);
    setIsCopied(true);
    await sleep(1500);
    setIsCopied(false);
  }, [props.value]);

  const theme = useMemo(
    () => ({
      defaultIcon: palette.get('icons.default'),
    }),
    [palette],
  );

  const renderComponent = useCallback(
    inputProps => <ReadOnlyTextInputComponent {...inputProps} theme={theme} />,
    [theme],
  );

  return <TextInput {...props} component={renderComponent} copyToClipboard={copyToClipboard} isCopied={isCopied} />;
};

ReadOnlyTextInput.propTypes = {
  value: PropTypes.string,
};

export default ReadOnlyTextInput;
