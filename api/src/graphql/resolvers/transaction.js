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
      data.updateTime = data.createTime;
      return context.dataSources.transaction.model.create(data);
    },
    updateTransaction: async (parent, args, context) => {
      await context.dataSources.transaction.model.findOneAndUpdate(
        { _id: args.id, accountId: context.accountId },
        { ...args.data, updateTime: getCurrentTimestamp() },
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
        return false;
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
        const { cardId, categoryId } = args.filters;
        if (cardId) {
          query.cardId = cardId;
        }
        if (categoryId) {
          query.categoryId = categoryId;
        }
      }
      const options = {
        sort: '-postTime',
        ...buildFindOptions(args),
      };
      return context.dataSources.transaction.model.find(query, null, options);
    },
  },
};
