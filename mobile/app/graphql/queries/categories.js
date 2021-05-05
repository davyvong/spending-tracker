import { gql } from '@apollo/client';

export const category = gql`
  query {
    category(id: ID!) {
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
