import { InternalServerError } from 'http-errors';
import { getCurrentTimestamp } from 'utils/date';
import { buildFindOptions } from 'utils/mongo';

export default {
  Mutation: {
    createBarcode: async (parent, args, context) => {
      const data = {
        ...args.data,
        accountId: context.accountId,
        createTime: getCurrentTimestamp(),
      };
      data.updateTime = data.createTime;
      return context.dataSources.barcode.model.create(data);
    },
    updateBarcode: async (parent, args, context) => {
      await context.dataSources.barcode.model.findOneAndUpdate(
        { _id: args.id, accountId: context.accountId },
        { ...args.data, updateTime: getCurrentTimestamp() },
      );
      return context.dataSources.barcode.findOneById(args.id);
    },
    deleteBarcode: async (parent, args, context) => {
      try {
        await context.dataSources.barcode.model.findOneAndRemove({
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
    barcode: async (parent, args, context) => {
      return context.dataSources.barcode.findOneById(args.id);
    },
    barcodes: async (parent, args, context) => {
      const query = {
        accountId: context.accountId,
      };
      if (!args.page) {
        return context.dataSources.barcode.model.find(query);
      }
      const options = buildFindOptions(args);
      return context.dataSources.barcode.model.find(query, null, options);
    },
  },
};
