import { buildFindOptions } from 'mongoose/utils';

export default {
  Query: {
    card: async (parent, args, context) => {
      return context.dataSources.card.findOneById(args.id);
    },
    cards: async (parent, args, context) => {
      const query = {};
      if (args.type) {
        query.type = args.type;
      }
      const options = buildFindOptions(args);
      return context.dataSources.card.model.find(query, null, options);
    },
  },
};
