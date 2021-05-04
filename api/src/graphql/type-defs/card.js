export default `
  type Query {
    card(id: ID!): Card
    cards(page: Page): [Card]
  }

  type Card {
    accountId: String
    color: String
    company: String
    id: ID!
    name: String
    type: String
  }
`;
