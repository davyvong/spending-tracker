import { authenticated } from 'graphql/rules';

export default {
  Query: {
    category: authenticated,
    categories: authenticated,
  },
};
