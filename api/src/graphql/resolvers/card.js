import { InternalServerError } from 'http-errors';
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
      if (args.data.currency) {
        await context.dataSources.transaction.model.updateMany(
          { accountId: context.accountId, cardId: args.id },
          { currency: args.data.currency },
        );
      }
      return context.dataSources.card.findOneById(args.id);
    },
    deleteCard: async (parent, args, context) => {
      try {
        await context.dataSources.transaction.model.deleteMany({ accountId: context.accountId, cardId: args.id });
        await context.dataSources.card.model.findOneAndRemove({
          _id: args.id,
          accountId: context.accountId,
        });
        return true;
      } catch (error) {
        return new InternalServerError();
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
