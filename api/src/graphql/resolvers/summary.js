import { BadRequest } from 'http-errors';
import moment from 'moment-timezone';
import { getCurrency } from 'utils/currency';
import { getDateStringFromMoment, getMonthStringFromMoment } from 'utils/date';

export default {
  Query: {
    dailySpending: async (parent, args, context) => {
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account || !getCurrency(account.preferredCurrency)) {
        throw new BadRequest();
      }
      const startDate = moment(args.startDate, 'YYYY-MM-DD', true);
      if (!startDate.isValid()) {
        throw new BadRequest();
      }
      const endDate = moment(args.endDate, 'YYYY-MM-DD', true);
      if (!endDate.isValid()) {
        throw new BadRequest();
      }
      const countOfDays = endDate.diff(startDate, 'days');
      if (countOfDays > 7) {
        throw new BadRequest();
      }
      const query = {
        accountId: context.accountId,
        postTime: {
          $lte: args.endDate,
          $gte: args.startDate,
        },
      };
      if (args.filters) {
        const { cardId } = args.filters;
        if (cardId) {
          query.cardId = cardId;
        }
      }
      let transactions = await context.dataSources.transaction.model.find(query);
      if (transactions.some(transaction => transaction.currencyCode !== account.preferredCurrency)) {
        transactions = await context.dataSources.currency.convert(transactions, account.preferredCurrency);
      }
      const dailySpending = Array(countOfDays + 1)
        .fill(null)
        .reduce((map, item, index) => {
          let dateString = moment(endDate);
          dateString.subtract(countOfDays - index, 'days');
          dateString = getDateStringFromMoment(dateString);
          map[dateString] = {
            credit: 0,
            currencyCode: account.preferredCurrency,
            date: dateString,
            debit: 0,
          };
          return map;
        }, {});
      transactions.forEach(transaction => {
        if (transaction.type === 'credit') {
          dailySpending[transaction.postTime].credit += transaction.amount;
        } else if (transaction.type === 'debit') {
          dailySpending[transaction.postTime].debit += transaction.amount;
        }
      });
      return Object.values(dailySpending);
    },
    monthlySpending: async (parent, args, context) => {
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account || !getCurrency(account.preferredCurrency)) {
        throw new BadRequest();
      }
      const startDate = moment(args.startDate, 'YYYY-MM', true);
      if (!startDate.isValid()) {
        throw new BadRequest();
      }
      const endDate = moment(args.endDate, 'YYYY-MM', true);
      if (!endDate.isValid()) {
        throw new BadRequest();
      }
      const countOfMonths = endDate.diff(startDate, 'months');
      if (countOfMonths > 6) {
        throw new BadRequest();
      }
      const query = {
        accountId: context.accountId,
        postTime: {
          $gte: args.startDate,
        },
      };
      endDate.add(1, 'months');
      query.postTime.$lte = getMonthStringFromMoment(endDate);
      endDate.subtract(1, 'months');
      if (args.filters) {
        const { cardId } = args.filters;
        if (cardId) {
          query.cardId = cardId;
        }
      }
      let transactions = await context.dataSources.transaction.model.find(query);
      if (transactions.some(transaction => transaction.currencyCode !== account.preferredCurrency)) {
        transactions = await context.dataSources.currency.convert(transactions, account.preferredCurrency);
      }
      const monthlySpending = Array(countOfMonths + 1)
        .fill(null)
        .reduce((map, item, index) => {
          let monthString = moment(endDate);
          monthString.subtract(countOfMonths - index, 'months');
          monthString = getMonthStringFromMoment(monthString);
          map[monthString] = {
            credit: 0,
            currencyCode: account.preferredCurrency,
            date: monthString,
            debit: 0,
          };
          return map;
        }, {});
      transactions.forEach(transaction => {
        let monthString = moment(transaction.postTime);
        monthString = getMonthStringFromMoment(monthString);
        if (transaction.type === 'credit') {
          monthlySpending[monthString].credit += transaction.amount;
        } else if (transaction.type === 'debit') {
          monthlySpending[monthString].debit += transaction.amount;
        }
      });
      return Object.values(monthlySpending);
    },
  },
};
