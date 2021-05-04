export default `
  type Query {
    category(id: ID!): Category
    categories(page: Page): [Category]
  }

  type Category {
    icon: String
    id: ID!
    name: String
  }
`;
