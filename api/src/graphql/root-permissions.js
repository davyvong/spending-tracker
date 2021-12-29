import { shield } from 'graphql-shield';
import accountPermissions from 'graphql/permissions/account';
import barcodePermissions from 'graphql/permissions/barcode';
import cardPermissions from 'graphql/permissions/card';
import categoryPermissions from 'graphql/permissions/category';
import transactionPermissions from 'graphql/permissions/transaction';
import merge from 'lodash.merge';

export default shield(
  merge(accountPermissions, barcodePermissions, cardPermissions, transactionPermissions, categoryPermissions),
  {
    fallbackError: error => error,
  },
);
