import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import MonthlySummaryComponent from './component';

const MonthlySummary = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('activeIcon'),
      statisticCard: {
        backgroundColor: palette.get('tileBackground'),
      },
      statisticLabel: {
        color: palette.get('primaryText'),
      },
      statisticCurrency: {
        color: palette.get('inputText'),
      },
    }),
    [palette],
  );

  return <MonthlySummaryComponent {...props} theme={theme} />;
};

export default MonthlySummary;
