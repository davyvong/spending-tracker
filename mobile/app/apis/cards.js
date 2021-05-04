import { getApolloClient } from 'graphql/client';
import * as cardMutations from 'graphql/mutations/cards';
import * as cardQueries from 'graphql/queries/cards';

export const createCard = card =>
  getApolloClient().mutate({
    mutation: cardMutations.createCard,
    variables: {
      data: card,
    },
  });

export const deleteCard = cardId =>
  getApolloClient().mutate({
    mutation: cardMutations.deleteCard,
    variables: {
      cardId,
    },
  });

export const getAllCards = () =>
  getApolloClient().query({
    query: cardQueries.getAllCards,
  });

export const updateCard = (id, card) =>
  getApolloClient().mutate({
    mutation: cardMutations.updateCard,
    variables: {
      data: card,
      cardId: id,
    },
  });
