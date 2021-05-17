import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';
import isFunction from 'utils/is-function';

import ActionSheetComponent from './component';

const ActionSheet = props => {
  const [callback, setCallback] = useState();
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      iconColor: palette.get('defaultIcon'),
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
      },
      actionText: {
        color: palette.get('normalText'),
      },
      actionButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
      closeButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      closeButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
    }),
    [palette],
  );

  const onModalHide = useCallback(() => {
    if (isFunction(callback)) {
      callback();
      setCallback();
    }
  }, [callback]);

  return <ActionSheetComponent {...props} onModalHide={onModalHide} setCallback={setCallback} theme={theme} />;
};

export default ActionSheet;
