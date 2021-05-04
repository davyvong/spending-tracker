import { authenticated } from 'graphql/rules';
import { allow } from 'graphql-shield';

export default {
  Mutation: {
    login: allow,
    updateAccount: authenticated,
    updatePassword: authenticated,
  },
  Query: {
    me: authenticated,
  },
};
