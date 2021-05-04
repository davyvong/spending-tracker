import { getApolloClient } from 'graphql/client';
import * as accountQueries from 'graphql/queries/account';

export const getMyAccount = () => getApolloClient().query({ query: accountQueries.getMyAccount });
