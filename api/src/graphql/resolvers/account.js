import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import { getCurrentTimestamp } from 'utils/date';
import { createPassword, verifyPassword } from 'utils/password';

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
      const verifiedPassword = await verifyPassword(args.oldPassword, account.get('passwordHash'));
      if (!verifiedPassword) {
        throw new Unauthorized();
      }
      try {
        const passwordHash = await createPassword(args.newPassword);
        await context.dataSources.account.model.findOneAndUpdate(
          { _id: context.accountId },
          { passwordHash, updateTime: getCurrentTimestamp() },
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  Query: {
    account: async (parent, args, context) => {
      return context.dataSources.account.findOneById(context.accountId);
    },
    login: async (parent, args, context) => {
      const account = await context.dataSources.account.model.findOne({ email: args.email });
      if (!account) {
        throw new Unauthorized();
      }
      const verifiedPassword = await verifyPassword(args.password, account.get('passwordHash'));
      if (!verifiedPassword) {
        throw new Unauthorized();
      }
      return jwt.sign({}, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '7d',
        subject: account.id,
      });
    },
  },
};
