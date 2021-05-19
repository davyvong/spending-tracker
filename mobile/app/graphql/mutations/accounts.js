import { gql } from '@apollo/client';

export const updateAccount = gql`
  mutation($data: UpdateAccountData!) {
    updateAccount(data: $data) {
      currencyCode
      email
      firstName
      id
      lastName
      theme
    }
  }
`;

export const updatePassword = gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;
