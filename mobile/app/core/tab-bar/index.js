import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TabBarComponent from './component';

const TabBar = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('backgrounds.app'),
      },
      activeItemIcon: {
        color: palette.get('icons.active'),
      },
      defaultItemIcon: {
        color: palette.get('icons.default'),
      },
      activeItemText: {
        color: palette.get('texts.primary'),
      },
      defaultItemText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  return <TabBarComponent {...props} theme={theme} />;
};

export default TabBar;
