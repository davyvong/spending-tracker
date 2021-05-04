import { buildFindOptions } from 'mongoose/utils';

export default {
  Query: {
    transaction: async (parent, args, context) => {
      return context.dataSources.transaction.findOneById(args.id);
    },
    transactions: async (parent, args, context) => {
      const query = {};
      if (args.cardId) {
        query.cardId = args.cardId;
      }
      const options = buildFindOptions(args);
      return context.dataSources.transaction.model.find(query, null, options);
    },
  },
};
