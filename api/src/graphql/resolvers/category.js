import { BadRequest } from 'http-errors';
import { buildFindOptions } from 'utils/mongo';

export default {
  Query: {
    category: async (parent, args, context) => {
      if (args.id) {
        return context.dataSources.category.findOneById(args.id);
      }
      if (args.name) {
        return context.dataSources.category.model.findOne({ name: args.name });
      }
      throw new BadRequest();
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
