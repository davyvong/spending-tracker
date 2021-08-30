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
    currency: String
    id: ID!
    items: [TransactionItem]
    postDate: String
    vendor: String
  }

  type TransactionItem {
    amount: Float
    description: String
  }

  input TransactionFilters {
    cardId: ID
    categoryId: ID
    endDate: String
    startDate: String
  }

  input TransactionItemData {
    amount: Float!
    description: String!
  }

  input CreateTransactionData {
    cardId: ID!
    categoryId: ID! 
    items: [TransactionItemData]!
    postDate: String!
    vendor: String!
  }

  input UpdateTransactionData {
    cardId: ID
    categoryId: ID
    items: [TransactionItemData]
    postDate: String
    vendor: String
  }
`;
