export default `
  type Mutation {
    updateAccount(data: UpdateAccountData!): Account
    updatePassword(currentPassword: String!, newPassword: String!): Boolean
  }

  type Query {
    account: Account!
    login(email: String!, password: String!): String!
  }

  type Account {
    currencyCode: String
    email: String
    firstName: String
    id: ID!
    lastName: String
    theme: String
  }

  input UpdateAccountData {
    currencyCode: String
    email: String
    firstName: String
    lastName: String
    theme: String
  }
`;
