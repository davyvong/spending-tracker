import { gql } from '@apollo/client';

export const transaction = gql`
  query($id: ID!) {
    transaction(id: $id) {
      amount
      cardId
      categoryId
      currency
      id
      items {
        amount
        description
      }
      postDate
      vendor
    }
  }
`;

export const transactions = gql`
  query($filters: TransactionFilters, $page: Page) {
    categories {
      icon
      id
      name
    }
    transactions(filters: $filters, page: $page) {
      amount
      cardId
      categoryId
      currency
      id
      items {
        amount
        description
      }
      postDate
      vendor
    }
  }
`;
