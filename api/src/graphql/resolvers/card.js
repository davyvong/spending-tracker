import { getCurrentTimestamp } from 'utils/date';
import { buildFindOptions } from 'utils/mongo';

export default {
  Mutation: {
    createCard: async (parent, args, context) => {
      const data = {
        ...args.data,
        accountId: context.accountId,
        createTime: getCurrentTimestamp(),
      };
      data.updateTime = data.createTime;
      return context.dataSources.card.model.create(data);
    },
    updateCard: async (parent, args, context) => {
      await context.dataSources.card.model.findOneAndUpdate(
        { _id: args.id, accountId: context.accountId },
        { ...args.data, updateTime: getCurrentTimestamp() },
      );
      return context.dataSources.card.findOneById(args.id);
    },
    deleteCard: async (parent, args, context) => {
      try {
        await context.dataSources.card.model.findOneAndRemove({
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
    card: async (parent, args, context) => {
      return context.dataSources.card.findOneById(args.id);
    },
    cards: async (parent, args, context) => {
      const query = {
        accountId: context.accountId,
      };
      if (!args.page) {
        return context.dataSources.card.model.find(query);
      }
      if (args.type) {
        query.type = args.type;
      }
      const options = buildFindOptions(args);
      return context.dataSources.card.model.find(query, null, options);
    },
  },
};
