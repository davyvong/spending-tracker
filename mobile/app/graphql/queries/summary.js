import { gql } from '@apollo/client';

export const getCardSpending = gql`
  query($cardId: String!, $month: String!) {
    getMonthlySpending(cardId: $cardId, month: $month) {
      credit
      currencyCode
      date
      debit
    }
  }
`;

export const getDailySpending = gql`
  query {
    getDailySpending {
      credit
      currencyCode
      date
      debit
    }
  }
`;

export const getMonthlySpending = gql`
  query($month: String!) {
    getMonthlySpending(month: $month) {
      credit
      currencyCode
      date
      debit
    }
  }
`;
