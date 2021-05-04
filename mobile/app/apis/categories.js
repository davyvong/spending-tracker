import { getApolloClient } from 'graphql/client';
import * as categoryQueries from 'graphql/queries/categories';

export const getAllCategories = () =>
  getApolloClient().query({
    query: categoryQueries.getAllCategories,
  });
