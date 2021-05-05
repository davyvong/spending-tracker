import { gql } from '@apollo/client';

export const card = gql`
  query {
    card(id: ID!) {
      color
      company
      name
      id
      type
    }
  }
`;

export const cards = gql`
  query {
    cards {
      color
      company
      name
      id
      type
    }
  }
`;
