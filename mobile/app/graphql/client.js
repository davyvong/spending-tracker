import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import moment from 'moment-timezone';
import SecureJWT from 'storage/jwt';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
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
  link: authLink.concat(httpLink),
});

export default client;
