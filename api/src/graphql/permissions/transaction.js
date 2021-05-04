import { authenticated } from 'graphql/rules';

export default {
  Query: {
    transaction: authenticated,
    transactions: authenticated,
  },
};
