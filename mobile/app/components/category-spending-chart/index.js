import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import CategorySpendingChartComponent from './component';

const CategorySpendingChart = ({ data, ...props }) => {
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

  const absData = useMemo(() => data.map(category => ({ ...category, amount: Math.abs(category.amount) })), [data]);

  const maxSpent = useMemo(() => absData.reduce((max, category) => Math.max(max, category.amount), 0), [absData]);

  return <CategorySpendingChartComponent {...props} data={absData} maxSpent={maxSpent} theme={theme} />;
};

CategorySpendingChart.defaultProps = {
  data: [],
};

CategorySpendingChart.propTypes = {
  data: PropTypes.array,
};

export default CategorySpendingChart;
