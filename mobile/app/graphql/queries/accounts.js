import { gql } from '@apollo/client';

export const account = gql`
  query {
    account {
      currencyCode
      email
      firstName
      id
      lastName
    }
  }
`;

export const login = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
