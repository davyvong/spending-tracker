import { authenticated } from 'graphql/rules';

export default {
  Mutation: {
    createTransaction: authenticated,
    deleteTransaction: authenticated,
    updateTransaction: authenticated,
  },
  Query: {
    transaction: authenticated,
    transactions: authenticated,
  },
};
