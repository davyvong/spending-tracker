export default `
  type Mutation {
    createTransaction(data: CreateTransactionData!): Card
    updateTransaction(id: ID!, data: UpdateTransactionData!): Card
    deleteTransaction(id: ID!): Boolean
  }

  type Query {
    transaction(id: ID!): Transaction
    transactions(cardId: ID, categoryId: ID, page: Page): [Transaction]
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

  input CreateTransactionData {
    amount: Float!
    cardId: ID!
    categoryId: ID!
    currencyCode: String!
    description: String
    postTime: String!
    type: String!
    vendor: String!
  }

  input UpdateTransactionData {
    amount: Float
    cardId: ID
    categoryId: ID
    currencyCode: String
    description: String
    postTime: String
    type: String
    vendor: String
  }
`;
