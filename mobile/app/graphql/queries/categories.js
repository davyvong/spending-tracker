import { gql } from '@apollo/client';

export const category = gql`
  query ($id: ID!) {
    category(id: $id) {
      icon
      id
      name
    }
  }
`;

export const categories = gql`
  query {
    categories {
      icon
      id
      name
    }
  }
`;
