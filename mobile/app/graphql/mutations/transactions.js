import { gql } from '@apollo/client';

export const createTransaction = gql`
  mutation($data: NewTransactionInput!) {
    createTransaction(data: $data) {
      amount
      cardId
      categoryId
      currencyCode
      description
      id
      postTime
      type
      vendor
    }
  }
`;

export const deleteTransaction = gql`
  mutation($transactionId: String!) {
    deleteTransaction(transactionId: $transactionId)
  }
`;

export const updateTransaction = gql`
  mutation($transactionId: String!, $data: UpdateTransactionInput!) {
    updateTransaction(data: $data, transactionId: $transactionId) {
      amount
      cardId
      categoryId
      currencyCode
      description
      id
      postTime
      type
      vendor
    }
  }
`;
