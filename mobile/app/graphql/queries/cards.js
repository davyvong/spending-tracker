import { gql } from '@apollo/client';

export const card = gql`
  query($id: ID!) {
    card(id: $id) {
      color
      company
      currencyCode
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
      currencyCode
      name
      id
      type
    }
  }
`;
