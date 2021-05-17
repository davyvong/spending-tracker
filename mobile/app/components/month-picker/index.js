import useTheme from 'hooks/theme';
import moment from 'moment-timezone';
import React, { useMemo } from 'react';

import MonthPickerComponent from './component';

const MonthPicker = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      optionMonthActive: {
        backgroundColor: palette.get('backgrounds.selectedTab'),
      },
      optionMonthActiveText: {
        color: palette.get('texts.primary'),
      },
      optionMonthText: {
        color: palette.get('texts.normal'),
      },
      optionYearText: {
        color: palette.get('texts.muted'),
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
