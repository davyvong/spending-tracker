import { gql } from '@apollo/client';

export const createCard = gql`
  mutation ($data: CreateCardData!) {
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
  mutation ($id: ID!) {
    deleteCard(id: $id)
  }
`;

export const updateCard = gql`
  mutation ($id: ID!, $data: UpdateCardData!) {
    updateCard(id: $id, data: $data) {
      color
      company
      name
      id
      type
    }
  }
`;
