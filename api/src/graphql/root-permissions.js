import { shield } from 'graphql-shield';
import accountPermissions from 'graphql/permissions/account';
import cardPermissions from 'graphql/permissions/card';
import categoryPermissions from 'graphql/permissions/category';
import transactionPermissions from 'graphql/permissions/transaction';
import merge from 'lodash.merge';

export default shield(merge(accountPermissions, cardPermissions, transactionPermissions, categoryPermissions), {
  fallbackError: error => error,
});
