import { gql } from '@apollo/client';

export const getAllCategories = gql`
  query {
    getAllCategories {
      icon
      id
      name
    }
  }
`;
