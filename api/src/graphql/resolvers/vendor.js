import { BadRequest } from 'http-errors';

export default {
  Query: {
    vendors: async (parent, args, context) => {
      if (!args.name) {
        throw new BadRequest();
      }
      return context.dataSources.vendor.search(args.name);
    },
  },
};
