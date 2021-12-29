import { gql } from '@apollo/client';

export const createBarcode = gql`
  mutation ($data: CreateBarcodeData!) {
    createBarcode(data: $data) {
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

export const deleteBarcode = gql`
  mutation ($id: ID!) {
    deleteBarcode(id: $id)
  }
`;

export const updateBarcode = gql`
  mutation ($id: ID!, $data: UpdateBarcodeData!) {
    updateBarcode(id: $id, data: $data) {
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
