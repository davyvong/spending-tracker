import { buildFindOptions } from 'utils/mongo';

export default {
  Query: {
    category: async (parent, args, context) => {
      return context.dataSources.category.findOneById(args.id);
    },
    categories: async (parent, args, context) => {
      const query = {};
      if (!args.page) {
        return context.dataSources.category.model.find(query);
      }
      const options = buildFindOptions(args);
      return context.dataSources.category.model.find(query, null, options);
    },
  },
};
