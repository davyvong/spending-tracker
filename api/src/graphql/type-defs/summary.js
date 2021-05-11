export default `
  type Query {
    dailySpending(startDate: String!, endDate: String!, filters: SpendingFilter): [Spending]
    monthlySpending(startMonth: String!, endMonth: String!, filters: SpendingFilter): [Spending]
  }

  type Spending {
    credit: Float
    currencyCode: String
    date: String
    debit: Float
  }

  input SpendingFilter {
    cardId: ID
  }
`;
