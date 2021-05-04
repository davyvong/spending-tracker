import { buildFindOptions } from 'mongoose/utils';
import { getCurrentTimestamp } from 'utils/date';

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
      if (args.cardId) {
        query.cardId = args.cardId;
      }
      if (args.categoryId) {
        query.categoryId = args.categoryId;
      }
      const options = buildFindOptions(args);
      return context.dataSources.transaction.model.find(query, null, options);
    },
  },
};
