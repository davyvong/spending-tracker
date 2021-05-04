import { mergeSchemas } from '@graphql-tools/merge';
import authenticationResolvers from 'graphql/resolvers/authentication';
import cardResolvers from 'graphql/resolvers/card';
import categoryResolvers from 'graphql/resolvers/category';
import transactionResolvers from 'graphql/resolvers/transaction';
import vendorResolvers from 'graphql/resolvers/vendor';
import authenticationTypeDefs from 'graphql/type-defs/authentication';
import cardTypeDefs from 'graphql/type-defs/card';
import categoryTypeDefs from 'graphql/type-defs/category';
import commonTypeDefs from 'graphql/type-defs/common';
import transactionTypeDefs from 'graphql/type-defs/transaction';
import vendorTypeDefs from 'graphql/type-defs/vendor';

export default mergeSchemas({
  resolvers: [authenticationResolvers, cardResolvers, categoryResolvers, transactionResolvers, vendorResolvers],
  schemas: [],
  typeDefs: [
    commonTypeDefs,
    authenticationTypeDefs,
    cardTypeDefs,
    categoryTypeDefs,
    transactionTypeDefs,
    vendorTypeDefs,
  ],
});
