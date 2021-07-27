export default `
  type Query {
    dailySpending(startDate: String!, endDate: String!, filters: SpendingFilter): [CurrencySpending]
    monthlySpending(startMonth: String!, endMonth: String!, filters: SpendingFilter): [CurrencySpending]
  }

  type CurrencySpending {
    currencyCode: String
    spending: [Spending]
  }

  type Spending {
    credit: Float
    date: String
    debit: Float
  }

  input SpendingFilter {
    cardId: ID
  }
`;
