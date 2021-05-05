import { gql } from '@apollo/client';

export const card = gql`
  query($id: ID!) {
    card(id: $id) {
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
