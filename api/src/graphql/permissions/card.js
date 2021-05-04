import { authenticated } from 'graphql/rules';

export default {
  Query: {
    card: authenticated,
    cards: authenticated,
  },
};
