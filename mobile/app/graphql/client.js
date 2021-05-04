import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import moment from 'moment-timezone';
import { getJWT } from 'storage/jwt';

let apolloClient = null;

export const createApolloClient = () => {
  const httpLink = createHttpLink({ uri: 'https://api.davyvong.com/budget/graphql' });
  const authLink = setContext(async (_, { headers }) => {
    const jwt = await getJWT();
    return {
      headers: {
        ...headers,
        authorization: jwt?.token ? `Bearer ${jwt.token}` : '',
        timezone: moment.tz.guess(),
      },
    };
  });
  apolloClient = new ApolloClient({
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
  return apolloClient;
};

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};
