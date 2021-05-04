import { gql } from '@apollo/client';

export const getTransaction = gql`
  query($transactionId: String!) {
    getTransaction(transactionId: $transactionId) {
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

export const getTransactions = gql`
  query($skip: Float!) {
    getAllCategories {
      icon
      id
      name
    }
    getTransactions(skip: $skip) {
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

export const getTransactionsInCard = gql`
  query($cardId: String!, $skip: Float!) {
    getTransactionsInCard(skip: $skip, cardId: $cardId) {
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

export const getTransactionsInCategory = gql`
  query($categoryId: String!, $skip: Float!) {
    getTransactionsInCategory(skip: $skip, categoryId: $categoryId) {
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
