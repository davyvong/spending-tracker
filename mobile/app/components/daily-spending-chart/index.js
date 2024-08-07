import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import DailySpendingChartComponent from './component';

const DailySpendingChart = ({ data, ...props }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      xAxis: {
        borderTopColor: palette.get('border'),
      },
      filledBar: {
        backgroundColor: palette.get('charts.primary-bar'),
      },
    }),
    [palette],
  );

  const maxSpent = useMemo(() => data.reduce((max, day) => Math.max(max, day.debit), 0), [data]);

  return <DailySpendingChartComponent {...props} data={data} maxSpent={maxSpent} theme={theme} />;
};

DailySpendingChart.defaultProps = {
  data: [],
};

DailySpendingChart.propTypes = {
  data: PropTypes.array,
};

export default DailySpendingChart;
