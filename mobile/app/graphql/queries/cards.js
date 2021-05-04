import { gql } from '@apollo/client';

export const getAllCards = gql`
  query {
    getAllCards {
      color
      company
      name
      id
      type
    }
  }
`;
