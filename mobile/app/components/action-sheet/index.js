import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';
import isFunction from 'utils/is-function';

import ActionSheetComponent from './component';

const ActionSheet = props => {
  const [callback, setCallback] = useState();
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      actionButtonIcon: palette.get('icons.default'),
      actionButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondaryButtonPressed'),
      },
      actionButtonText: {
        color: palette.get('texts.normal'),
      },
      closeButton: {
        backgroundColor: palette.get('backgrounds.secondaryButton'),
      },
      closeButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondaryButtonPressed'),
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
