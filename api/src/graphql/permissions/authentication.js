import { authenticated } from 'graphql/rules';
import { allow } from 'graphql-shield';

export default {
  Mutation: {
    login: allow,
    changePassword: authenticated,
  },
  Query: {
    me: authenticated,
  },
};
