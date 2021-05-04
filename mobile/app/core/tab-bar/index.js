import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TabBarComponent from './component';

const TabBar = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('appBackground'),
      },
      activeItemIcon: {
        color: palette.get('activeIcon'),
      },
      defaultItemIcon: {
        color: palette.get('defaultIcon'),
      },
      activeItemText: {
        color: palette.get('primaryText'),
      },
      defaultItemText: {
        color: palette.get('mutedText'),
      },
    }),
    [palette],
  );

  return <TabBarComponent {...props} theme={theme} />;
};

export default TabBar;
