import { authenticated } from 'graphql/rules';

export default {
  Mutation: {
    createCard: authenticated,
    deleteCard: authenticated,
    updateCard: authenticated,
  },
  Query: {
    card: authenticated,
    cards: authenticated,
  },
};
