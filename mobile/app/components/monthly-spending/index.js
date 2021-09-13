import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import MonthlySpendingComponent from './component';

const MonthlySpending = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('icons.active'),
      statisticCard: {
        backgroundColor: palette.get('backgrounds.tile'),
      },
      statisticLabel: {
        color: palette.get('texts.primary'),
      },
      statisticCurrency: {
        color: palette.get('texts.input'),
      },
    }),
    [palette],
  );

  return <MonthlySpendingComponent {...props} theme={theme} />;
};

export default MonthlySpending;
