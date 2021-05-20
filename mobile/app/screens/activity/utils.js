import moment from 'moment-timezone';

export const getBaseDailySpending = (dayCount, currencyCode) => {
  const dailySpendingList = [];
  const currentDate = moment().subtract(dayCount - 1, 'days');
  for (let i = 0; i < dayCount; i += 1) {
    dailySpendingList.push({
      credit: 0,
      currencyCode,
      date: currentDate.format('YYYY-MM-DD'),
      debit: 0,
    });
    currentDate.add(1, 'days');
  }
  return dailySpendingList;
};
