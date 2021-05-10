import { gql } from '@apollo/client';

export const updateAccount = gql`
  mutation($data: UpdateAccountData!) {
    updateAccount(data: $data) {
      email
      firstName
      id
      lastName
      preferredCurrency
    }
  }
`;

export const updatePassword = gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;
