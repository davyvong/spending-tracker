import { gql } from '@apollo/client';

export const barcode = gql`
  query ($id: ID!) {
    barcode(id: $id) {
      attributes {
        name
        value
      }
      id
      name
      value
    }
  }
`;

export const barcodes = gql`
  query {
    barcodes {
      attributes {
        name
        value
      }
      id
      name
      value
    }
  }
`;
