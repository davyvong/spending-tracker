export default `
  type Query {
    dailySpending(startDate: String!, endDate: String!): [Spending]
    monthlySpending(startDate: String!, endDate: String!): [Spending]
  }

  type Spending {
    credit: Float
    currencyCode: String
    date: String
    debit: Float
  }
`;
