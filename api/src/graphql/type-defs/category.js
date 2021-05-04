export default `
  type Query {
    category(id: ID, name: String): Category
    categories(page: Page): [Category]
  }

  type Category {
    icon: String
    id: ID!
    name: String
  }
`;
