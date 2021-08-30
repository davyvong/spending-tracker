import Transaction from 'models/transaction';
import moment from 'moment-timezone';

export const getBaseDailySpending = dayCount => {
  const dailySpendingList = [];
  const currentDate = moment().subtract(dayCount - 1, 'days');
  for (let i = 0; i < dayCount; i += 1) {
    dailySpendingList.push({
      credit: 0,
      currency: null,
      date: currentDate.format('YYYY-MM-DD'),
      debit: 0,
    });
    currentDate.add(1, 'days');
  }
  return dailySpendingList;
};

export const getTransactionSections = (storage, callback) => async transactionIds => {
  const transactionList = Array.from(transactionIds);
  const transactionSectionMap = {};
  for (let i = 0; i < transactionList.length; i += 1) {
    const storageKey = storage.getItemKey('transaction', transactionList[i]);
    const cachedTransaction = await storage.getItem(storageKey);
    if (cachedTransaction) {
      const transaction = new Transaction(cachedTransaction);
      const { postDate } = transaction;
      const section = moment(postDate, 'YYYY-MM-DD').isAfter(moment()) ? 'PENDING' : postDate;
      if (transactionSectionMap[section]) {
        transactionSectionMap[section].data.push(transaction);
      } else {
        transactionSectionMap[section] = {
          data: [transaction],
          section,
        };
      }
    }
  }
  callback(Object.values(transactionSectionMap));
};
