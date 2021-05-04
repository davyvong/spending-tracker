import useTheme from 'hooks/theme';
import moment from 'moment-timezone';
import React, { useMemo } from 'react';

import MonthPickerComponent from './component';

const MonthPicker = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      optionMonthActive: {
        backgroundColor: palette.get('selectedBackground'),
      },
      optionMonthActiveText: {
        color: palette.get('primaryText'),
      },
      optionMonthText: {
        color: palette.get('normalText'),
      },
      optionYearText: {
        color: palette.get('mutedText'),
      },
    }),
    [palette],
  );

  const options = useMemo(() => {
    const getMonth = (item, index) => {
      const date = moment().subtract(5 - index, 'months');
      return date.format('YYYY-MM');
    };
    return new Array(6).fill(null).map(getMonth);
  }, []);

  return <MonthPickerComponent {...props} options={options} theme={theme} />;
};

export default MonthPicker;
