import { gql } from '@apollo/client';

export const account = gql`
  query {
    account {
      currency
      email
      firstName
      id
      lastName
      theme
    }
  }
`;

export const login = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
