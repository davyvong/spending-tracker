export default `
  type Mutation {
    createCard(data: CreateCardData!): Card
    deleteCard(id: ID!): Boolean
    updateCard(id: ID!, data: UpdateCardData!): Card
  }

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

  input CreateCardData {
    color: String!
    company: String!
    name: String!
    type: String!
  }

  input UpdateCardData {
    color: String
    company: String
    name: String
    type: String
  }
`;
