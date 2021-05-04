import { mergeSchemas } from '@graphql-tools/merge';
import accountResolvers from 'graphql/resolvers/account';
import cardResolvers from 'graphql/resolvers/card';
import categoryResolvers from 'graphql/resolvers/category';
import summaryResolvers from 'graphql/resolvers/summary';
import transactionResolvers from 'graphql/resolvers/transaction';
import vendorResolvers from 'graphql/resolvers/vendor';
import accountTypeDefs from 'graphql/type-defs/account';
import cardTypeDefs from 'graphql/type-defs/card';
import categoryTypeDefs from 'graphql/type-defs/category';
import commonTypeDefs from 'graphql/type-defs/common';
import summaryTypeDefs from 'graphql/type-defs/summary';
import transactionTypeDefs from 'graphql/type-defs/transaction';
import vendorTypeDefs from 'graphql/type-defs/vendor';

export default mergeSchemas({
  resolvers: [
    accountResolvers,
    cardResolvers,
    categoryResolvers,
    summaryResolvers,
    transactionResolvers,
    vendorResolvers,
  ],
  schemas: [],
  typeDefs: [
    commonTypeDefs,
    accountTypeDefs,
    cardTypeDefs,
    categoryTypeDefs,
    summaryTypeDefs,
    transactionTypeDefs,
    vendorTypeDefs,
  ],
});
