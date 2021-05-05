import { gql } from '@apollo/client';

export const dailySpending = gql`
  query($startDate: String!, $endDate: String!, $filters: SpendingFilter) {
    dailySpending(startDate: $startDate, endDate: $endDate, filters: $filters) {
      credit
      currencyCode
      date
      debit
    }
  }
`;

export const monthlySpending = gql`
  query($startDate: String!, $endDate: String!, $filters: SpendingFilter) {
    monthlySpending(startDate: $startDate, endDate: $endDate, filters: $filters) {
      credit
      currencyCode
      date
      debit
    }
  }
`;
