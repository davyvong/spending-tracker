import { shield } from 'graphql-shield';
import authenticationPermissions from 'graphql/permissions/authentication';
import cardPermissions from 'graphql/permissions/card';
import categoryPermissions from 'graphql/permissions/category';
import transactionPermissions from 'graphql/permissions/transaction';
import merge from 'lodash.merge';

export default shield(merge(authenticationPermissions, cardPermissions, transactionPermissions, categoryPermissions), {
  fallbackError: error => error,
});
