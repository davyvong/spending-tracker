import { gql } from '@apollo/client';

export const vendors = gql`
  query($name: String!) {
    vendors(name: $name)
  }
`;
