import { getApolloClient } from 'graphql/client';
import * as transactionMutations from 'graphql/mutations/transactions';
import * as transactionQueries from 'graphql/queries/transactions';

export const createTransaction = transaction =>
  getApolloClient().mutate({
    mutation: transactionMutations.createTransaction,
    variables: {
      data: transaction,
    },
  });

export const deleteTransaction = transactionId =>
  getApolloClient().mutate({
    mutation: transactionMutations.deleteTransaction,
    variables: {
      transactionId,
    },
  });

export const getTransaction = transactionId =>
  getApolloClient().query({
    query: transactionQueries.getTransaction,
    variables: {
      transactionId,
    },
  });

export const getTransactions = (skip = 0) =>
  getApolloClient().query({
    query: transactionQueries.getTransactions,
    variables: {
      skip,
    },
  });

export const getTransactionsInCategory = (categoryId, skip = 0) =>
  getApolloClient().query({
    query: transactionQueries.getTransactionsInCategory,
    variables: {
      categoryId,
      skip,
    },
  });

export const updateTransaction = (id, transaction) =>
  getApolloClient().mutate({
    mutation: transactionMutations.updateTransaction,
    variables: {
      data: transaction,
      transactionId: id,
    },
  });
