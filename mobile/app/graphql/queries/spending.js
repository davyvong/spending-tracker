import { gql } from '@apollo/client';

export const categorySpending = gql`
  query ($startMonth: String!, $endMonth: String!, $filters: SpendingFilter) {
    categorySpending(startMonth: $startMonth, endMonth: $endMonth, filters: $filters) {
      categoryId
      spending {
        credit
        debit
        type
      }
      transactionCount
    }
  }
`;

export const dailySpending = gql`
  query ($startDate: String!, $endDate: String!, $filters: SpendingFilter) {
    dailySpending(startDate: $startDate, endDate: $endDate, filters: $filters) {
      currency
      spending {
        credit
        debit
        type
      }
    }
  }
`;

export const monthlySpending = gql`
  query ($startMonth: String!, $endMonth: String!, $filters: SpendingFilter) {
    monthlySpending(startMonth: $startMonth, endMonth: $endMonth, filters: $filters) {
      currency
      spending {
        credit
        debit
        type
      }
    }
  }
`;
