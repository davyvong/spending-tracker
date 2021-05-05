import { gql } from '@apollo/client';

export const createCard = gql`
  mutation {
    createCard(data: CreateCardData!) {
      color
      company
      name
      id
      type
    }
  }
`;

export const deleteCard = gql`
  mutation {
    deleteCard(id: ID!)
  }
`;

export const updateCard = gql`
  mutation {
    updateCard(id: ID!, data: UpdateCardData!) {
      color
      company
      name
      id
      type
    }
  }
`;
