import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TabPickerComponent from './component';

const TabPicker = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      optionActive: {
        backgroundColor: palette.get('backgrounds.selected-tab'),
      },
      optionActiveText: {
        color: palette.get('texts.primary'),
      },
      optionDefaultText: {
        color: palette.get('texts.normal'),
      },
    }),
    [palette],
  );

  return <TabPickerComponent {...props} theme={theme} />;
};

export default TabPicker;
