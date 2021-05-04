export default `
  type Query {
    transaction(id: ID!): Transaction
    transactions(cardId: ID, page: Page): [Transaction]
  }

  type Transaction {
    amount: Float
    cardId: String
    categoryId: String
    currencyCode: String
    description: String
    id: ID!
    postTime: String
    type: String
    vendor: String
  }
`;
