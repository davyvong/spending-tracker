import { gql } from '@apollo/client';

export const account = gql`
  query {
    account {
      email
      firstName
      id
      lastName
      preferredCurrency
    }
  }
`;

export const login = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
