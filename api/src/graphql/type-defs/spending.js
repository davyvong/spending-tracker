export default `
  type Query {
    categorySpending(startMonth: String!, endMonth: String!, filters: SpendingFilter): [CategorySpending]
    dailySpending(startDate: String!, endDate: String!, filters: SpendingFilter): [CurrencySpending]
    monthlySpending(startMonth: String!, endMonth: String!, filters: SpendingFilter): [CurrencySpending]
  }

  type CategorySpending {
    categoryId: String
    spending: [Spending]
    transactionCount: Float
  }

  type CurrencySpending {
    currency: String
    spending: [Spending]
  }

  type Spending {
    credit: Float
    debit: Float
    type: String
  }

  input SpendingFilter {
    cardId: ID
  }
`;
