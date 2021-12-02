import { gql } from '@apollo/client';

export const card = gql`
  query ($id: ID!) {
    card(id: $id) {
      color
      company
      currency
      name
      id
      type
      visible
    }
  }
`;

export const cards = gql`
  query {
    cards {
      color
      company
      currency
      name
      id
      type
      visible
    }
  }
`;
