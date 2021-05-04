export default `
  type Mutation {
    login(email: String!, password: String!): String
    updateAccount(data: UpdateAccountData!): Account
    updatePassword(oldPassword: String!, newPassword: String!): Boolean
  }

  type Query {
    me: Account
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
