import { gql } from '@apollo/client';

export const createTransaction = gql`
  mutation($data: CreateTransactionData!) {
    createTransaction(data: $data) {
      amount
      cardId
      categoryId
      currencyCode
      description
      id
      postDate
      type
      vendor
    }
  }
`;

export const deleteTransaction = gql`
  mutation($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

export const updateTransaction = gql`
  mutation($id: ID!, $data: UpdateTransactionData!) {
    updateTransaction(id: $id, data: $data) {
      amount
      cardId
      categoryId
      currencyCode
      description
      id
      postDate
      type
      vendor
    }
  }
`;
