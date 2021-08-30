import { InternalServerError } from 'http-errors';
import { getCurrentTimestamp } from 'utils/date';
import { buildFindOptions } from 'utils/mongo';

export default {
  Mutation: {
    createTransaction: async (parent, args, context) => {
      const data = {
        ...args.data,
        accountId: context.accountId,
        createTime: getCurrentTimestamp(),
      };
      data.amount = data.items.reduce((amount, item) => amount + item.amount, 0);
      data.updateTime = data.createTime;
      return context.dataSources.transaction.model.create(data);
    },
    updateTransaction: async (parent, args, context) => {
      const data = {
        ...args.data,
        updateTime: getCurrentTimestamp(),
      };
      if (Array.isArray(data.items)) {
        data.amount = data.items.reduce((amount, item) => amount + item.amount, 0);
      }
      await context.dataSources.transaction.model.findOneAndUpdate(
        { _id: args.id, accountId: context.accountId },
        data,
      );
      return context.dataSources.transaction.findOneById(args.id);
    },
    deleteTransaction: async (parent, args, context) => {
      try {
        await context.dataSources.transaction.model.findOneAndRemove({
          _id: args.id,
          accountId: context.accountId,
        });
        return true;
      } catch (error) {
        throw new InternalServerError();
      }
    },
  },
  Query: {
    transaction: async (parent, args, context) => {
      return context.dataSources.transaction.findOneById(args.id);
    },
    transactions: async (parent, args, context) => {
      const query = {
        accountId: context.accountId,
      };
      if (args.filters) {
        const { cardId, categoryId, endDate, startDate } = args.filters;
        if (cardId) {
          query.cardId = cardId;
        }
        if (categoryId) {
          query.categoryId = categoryId;
        }
        if (endDate || startDate) {
          query.postDate = {};
        }
        if (endDate) {
          query.postDate.$lte = endDate;
        }
        if (startDate) {
          query.postDate.$gte = startDate;
        }
      }
      const options = {
        sort: '-postDate',
        ...buildFindOptions(args),
      };
      return context.dataSources.transaction.model.find(query, null, options);
    },
  },
};
