import { gql } from '@apollo/client';

export const searchVendors = gql`
  query($keywords: String!) {
    searchVendors(keywords: $keywords)
  }
`;
