import { BadRequest, Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import { getCurrentTimestamp } from 'utils/date';

export default {
  Mutation: {
    login: async (parent, args, context) => {
      if (!args.email || !args.password) {
        throw new BadRequest();
      }
      const account = await context.dataSources.account.model.findOne({ email: args.email });
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
        expiresIn: '7d',
        subject: account.id,
      });
    },
    changePassword: async (parent, args, context) => {
      if (!args.oldPassword || !args.newPassword) {
        throw new BadRequest();
      }
      const account = await context.dataSources.account.findOneById(context.accountId);
      if (!account) {
        throw new Unauthorized();
      }
      const verifiedPassword = await context.dataSources.account.verifyPassword(
        args.oldPassword,
        account.get('passwordHash'),
      );
      if (!verifiedPassword) {
        throw new Unauthorized();
      }
      const passwordHash = await context.dataSources.account.createPassword(args.newPassword);
      await context.dataSources.account.model.findOneAndUpdate(
        { _id: context.accountId },
        { passwordHash, updateTime: getCurrentTimestamp() },
      );
      return true;
    },
  },
  Query: {
    me: async (parent, args, context) => {
      return context.dataSources.account.findOneById(context.accountId);
    },
  },
};
