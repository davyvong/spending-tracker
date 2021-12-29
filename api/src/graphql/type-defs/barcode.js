export default `
  type Mutation {
    createBarcode(data: CreateBarcodeData!): Barcode
    deleteBarcode(id: ID!): Boolean
    updateBarcode(id: ID!, data: UpdateBarcodeData!): Barcode
  }

  type Query {
    barcode(id: ID!): Barcode
    barcodes(page: Page): [Barcode]
  }

  type Barcode {
    attributes: [BarcodeAttribute]
    id: ID!
    name: String
    value: String
  }

  type BarcodeAttribute {
    name: String
    value: String
  }

  input CreateBarcodeData {
    attributes: [BarcodeAttribute]!
    name: String!
    value: String!
  }

  input UpdateBarcodeData {
    attributes: [BarcodeAttribute]
    name: String
    value: String
  }
`;
