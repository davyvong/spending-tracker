import { gql } from '@apollo/client';

export const getMyAccount = gql`
  query {
    getMyAccount {
      email
      firstName
      id
      lastName
      preferredCurrency
    }
  }
`;
