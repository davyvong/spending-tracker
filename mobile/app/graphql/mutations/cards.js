import { gql } from '@apollo/client';

export const createCard = gql`
  mutation($data: NewCardInput!) {
    createCard(data: $data) {
      color
      company
      name
      id
      type
    }
  }
`;

export const deleteCard = gql`
  mutation($cardId: String!) {
    deleteCard(cardId: $cardId)
  }
`;

export const updateCard = gql`
  mutation($cardId: String!, $data: UpdateCardInput!) {
    updateCard(data: $data, cardId: $cardId) {
      color
      company
      name
      id
      type
    }
  }
`;
