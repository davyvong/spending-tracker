import { InternalServerError, Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import { getCurrentTimestamp } from 'utils/date';

export default {
  Mutation: {
    updateAccount: async (parent, args, context) => {
      await context.dataSources.account.model.findOneAndUpdate(
        { _id: context.accountId },
        { ...args.data, updateTime: getCurrentTimestamp() },
      );
      return context.dataSources.account.findOneById(context.accountId);
    },
    updatePassword: async (parent, args, context) => {
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account) {
        throw new Unauthorized();
      }
      const verifiedPassword = await context.dataSources.account.verifyPassword(
        args.currentPassword,
        account.get('passwordHash'),
      );
      if (!verifiedPassword) {
        throw new Unauthorized();
      }
      try {
        const passwordHash = await context.dataSources.account.createPassword(args.newPassword);
        await context.dataSources.account.model.findOneAndUpdate(
          { _id: context.accountId },
          { passwordHash, updateTime: getCurrentTimestamp() },
        );
        return true;
      } catch (error) {
        throw new InternalServerError();
      }
    },
  },
  Query: {
    account: async (parent, args, context) => {
      return context.dataSources.account.findOneById(context.accountId);
    },
    login: async (parent, args, context) => {
      const account = await context.dataSources.account.model.findOne({
        email: args.email.toLowerCase(),
      });
      if (!account) {
        throw new Unauthorized();
      }
      const verifiedPassword = await context.dataSources.account.verifyPassword(
        args.password,
        account.get('passwordHash'),
      );
      if (!verifiedPassword) {
        throw new Unauthorized();
      }
      return jwt.sign({}, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        subject: account.id,
      });
    },
  },
};
