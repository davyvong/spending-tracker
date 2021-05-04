import { getApolloClient } from 'graphql/client';
import * as authenticationQueries from 'graphql/queries/authentication';

export const signInWithEmail = (email, password) =>
  getApolloClient().query({
    query: authenticationQueries.signInWithEmail,
    variables: {
      credentials: {
        email,
        plainPassword: password,
      },
    },
  });
