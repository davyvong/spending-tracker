import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import ActionSheetComponent from './component';

const ActionSheet = props => {
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

  return <ActionSheetComponent {...props} theme={theme} />;
};

export default ActionSheet;
