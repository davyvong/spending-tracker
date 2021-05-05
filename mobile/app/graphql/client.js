import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import moment from 'moment-timezone';
import SecureJWT from 'storage/jwt';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      console.log(error.message);
    });
  }
  if (networkError) {
    console.log(networkError.message);
  }
});

const authLink = setContext(async (request, context) => {
  const headers = {
    ...context.headers,
    timezone: moment.tz.guess(),
  };
  const jwt = await SecureJWT.get();
  if (jwt) {
    headers.authorization = `Bearer ${jwt}`;
  }
  return { headers };
});

const httpLink = createHttpLink({
  uri: 'http://192.168.0.24:3000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
  },
  link: from([errorLink, authLink, httpLink]),
});

export default client;
