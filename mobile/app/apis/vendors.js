import { getApolloClient } from 'graphql/client';
import * as vendorQueries from 'graphql/queries/vendors';

export const searchVendors = async keywords => {
  const { data } = await getApolloClient().query({
    query: vendorQueries.searchVendors,
    variables: {
      keywords,
    },
  });
  return data ? data.searchVendors : [];
};
