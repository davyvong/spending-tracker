export default `
  type Query {
    dailySpending(startDate: String!, endDate: String!, currency: String!): [Spending]
    monthlySpending(startDate: String!, endDate: String!, currency: String!): [Spending]
  }

  type Spending {
    credit: Float
    currencyCode: String
    date: String
    debit: Float
  }
`;
