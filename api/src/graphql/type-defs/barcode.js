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

  input BarcodeAttributeData {
    name: String!
    value: String!
  }

  input CreateBarcodeData {
    attributes: [BarcodeAttributeData]!
    name: String!
    value: String!
  }

  input UpdateBarcodeData {
    attributes: [BarcodeAttributeData]
    name: String
    value: String
  }
`;
