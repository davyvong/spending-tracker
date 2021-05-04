import { authenticated } from 'graphql/rules';
import { allow } from 'graphql-shield';

export default {
  Mutation: {
    updateAccount: authenticated,
    updatePassword: authenticated,
  },
  Query: {
    account: authenticated,
    login: allow,
  },
};
