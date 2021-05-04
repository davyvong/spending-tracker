export default `
  type Query {
    dailySpending(currency: String, startDate: String, endDate: String): [Spending]
    monthlySpending(currency: String, startDate: String, endDate: String): [Spending]
  }

  type Spending {
    credit: Float
    currencyCode: String
    date: String
    debit: Float
  }
`;
