export default `
  type Mutation {
    login(email: String, password: String): String
    changePassword(oldPassword: String, newPassword: String): Boolean
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
`;
