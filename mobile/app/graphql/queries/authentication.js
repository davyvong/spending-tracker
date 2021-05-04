import { gql } from '@apollo/client';

export const signInWithEmail = gql`
  query($credentials: EmailCredentialsInput!) {
    signInWithEmail(data: $credentials) {
      exp
      iat
      token
    }
  }
`;
