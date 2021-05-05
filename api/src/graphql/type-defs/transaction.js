export default `
  type Mutation {
    createTransaction(data: CreateTransactionData!): Transaction
    deleteTransaction(id: ID!): Boolean
    updateTransaction(id: ID!, data: UpdateTransactionData!): Transaction
  }

  type Query {
    transaction(id: ID!): Transaction
    transactions(filters: TransactionFilters, page: Page): [Transaction]
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

  input TransactionFilters {
    cardId: ID
    categoryId: ID
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
