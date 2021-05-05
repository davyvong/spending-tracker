export default {
  Query: {
    vendors: async (parent, args, context) => {
      return context.dataSources.vendor.search(args.name);
    },
  },
};
