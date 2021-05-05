export default `
  type Mutation {
    updateAccount(data: UpdateAccountData!): Account
    updatePassword(oldPassword: String!, newPassword: String!): Boolean
  }

  type Query {
    account: Account!
    login(email: String!, password: String!): String!
  }

  type Account {
    email: String
    firstName: String
    id: ID!
    lastName: String
    preferredCurrency: String
  }

  input UpdateAccountData {
    email: String
    firstName: String
    lastName: String
    preferredCurrency: String
  }
`;
