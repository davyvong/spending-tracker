import { gql } from '@apollo/client';

export const updateAccount = gql`
  mutation($data: UpdateAccountData!) {
    updateAccount(data: $data)
      email
      firstName
      id
      lastName
      preferredCurrency
    }
  }
`;
