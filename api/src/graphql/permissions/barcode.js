import { authenticated } from 'graphql/rules';

export default {
  Mutation: {
    createBarcode: authenticated,
    deleteBarcode: authenticated,
    updateBarcode: authenticated,
  },
  Query: {
    barcode: authenticated,
    barcodes: authenticated,
  },
};
