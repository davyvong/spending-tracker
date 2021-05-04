import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TabPickerComponent from './component';

const TabPicker = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      optionActive: {
        backgroundColor: palette.get('selectedBackground'),
      },
      optionActiveText: {
        color: palette.get('primaryText'),
      },
      optionDefaultText: {
        color: palette.get('normalText'),
      },
    }),
    [palette],
  );

  return <TabPickerComponent {...props} theme={theme} />;
};

export default TabPicker;
