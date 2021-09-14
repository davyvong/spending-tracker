import { mergeSchemas } from '@graphql-tools/merge';
import accountResolvers from 'graphql/resolvers/account';
import cardResolvers from 'graphql/resolvers/card';
import categoryResolvers from 'graphql/resolvers/category';
import spendingResolvers from 'graphql/resolvers/spending';
import transactionResolvers from 'graphql/resolvers/transaction';
import vendorResolvers from 'graphql/resolvers/vendor';
import accountTypeDefs from 'graphql/type-defs/account';
import cardTypeDefs from 'graphql/type-defs/card';
import categoryTypeDefs from 'graphql/type-defs/category';
import commonTypeDefs from 'graphql/type-defs/common';
import spendingTypeDefs from 'graphql/type-defs/spending';
import transactionTypeDefs from 'graphql/type-defs/transaction';
import vendorTypeDefs from 'graphql/type-defs/vendor';

export default mergeSchemas({
  resolvers: [
    accountResolvers,
    cardResolvers,
    categoryResolvers,
    spendingResolvers,
    transactionResolvers,
    vendorResolvers,
  ],
  schemas: [],
  typeDefs: [
    commonTypeDefs,
    accountTypeDefs,
    cardTypeDefs,
    categoryTypeDefs,
    spendingTypeDefs,
    transactionTypeDefs,
    vendorTypeDefs,
  ],
});
