import { BadRequest } from 'http-errors';
import moment from 'moment-timezone';
import { getDateStringFromMoment, getMonthStringFromMoment } from 'utils/date';

export default {
  Query: {
    dailySpending: async (parent, args, context) => {
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account) {
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
        postDate: {
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
      const transactions = await context.dataSources.transaction.model.find(query);
      let dailySpending = {};
      transactions.forEach(transaction => {
        if (!dailySpending[transaction.currencyCode]) {
          dailySpending[transaction.currencyCode] = {
            currencyCode: transaction.currencyCode,
            spending: Array(countOfDays + 1)
              .fill(null)
              .reduce((map, item, index) => {
                let dateString = moment(endDate);
                dateString.subtract(countOfDays - index, 'days');
                dateString = getDateStringFromMoment(dateString);
                map[dateString] = {
                  credit: 0,
                  date: dateString,
                  debit: 0,
                };
                return map;
              }, {}),
          };
        }
        dailySpending[transaction.currencyCode].spending[transaction.postDate][transaction.type] += transaction.amount;
      });
      dailySpending = Object.values(dailySpending);
      for (let i = 0; i < dailySpending.length; i++) {
        dailySpending[i].spending = Object.values(dailySpending[i].spending);
      }
      return dailySpending;
    },
    monthlySpending: async (parent, args, context) => {
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account) {
        throw new BadRequest();
      }
      const startMonth = moment(args.startMonth, 'YYYY-MM', true);
      if (!startMonth.isValid()) {
        throw new BadRequest();
      }
      const endMonth = moment(args.endMonth, 'YYYY-MM', true);
      if (!endMonth.isValid()) {
        throw new BadRequest();
      }
      const countOfMonths = endMonth.diff(startMonth, 'months');
      if (countOfMonths > 6) {
        throw new BadRequest();
      }
      const query = {
        accountId: context.accountId,
        postDate: {
          $gte: args.startMonth,
        },
      };
      endMonth.add(1, 'months');
      query.postDate.$lte = getMonthStringFromMoment(endMonth);
      endMonth.subtract(1, 'months');
      if (args.filters) {
        const { cardId } = args.filters;
        if (cardId) {
          query.cardId = cardId;
        }
      }
      const transactions = await context.dataSources.transaction.model.find(query);
      let monthlySpending = {};
      transactions.forEach(transaction => {
        if (!monthlySpending[transaction.currencyCode]) {
          monthlySpending[transaction.currencyCode] = {
            currencyCode: transaction.currencyCode,
            spending: Array(countOfMonths + 1)
              .fill(null)
              .reduce((map, item, index) => {
                let monthString = moment(endMonth);
                monthString.subtract(countOfMonths - index, 'months');
                monthString = getMonthStringFromMoment(monthString);
                map[monthString] = {
                  credit: 0,
                  date: monthString,
                  debit: 0,
                };
                return map;
              }, {}),
          };
        }
        let monthString = moment(transaction.postDate);
        monthString = getMonthStringFromMoment(monthString);
        monthlySpending[transaction.currencyCode].spending[monthString][transaction.type] += transaction.amount;
      });
      monthlySpending = Object.values(monthlySpending);
      for (let i = 0; i < monthlySpending.length; i++) {
        monthlySpending[i].spending = Object.values(monthlySpending[i].spending);
      }
      return monthlySpending;
    },
  },
};
