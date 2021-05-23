import { useApolloClient } from '@apollo/client';
import useStorage from 'hooks/storage';
import * as accountsMutations from 'graphql/mutations/accounts';
import * as cardsMutations from 'graphql/mutations/cards';
import * as transactionsMutations from 'graphql/mutations/transactions';
import * as accountsQueries from 'graphql/queries/accounts';
import * as cardsQueries from 'graphql/queries/cards';
import * as categoriesQueries from 'graphql/queries/categories';
import * as summariesQueries from 'graphql/queries/summaries';
import * as transactionsQueries from 'graphql/queries/transactions';
import Account from 'models/account';
import Card from 'models/card';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { createContext, useCallback } from 'react';
import JWTStorageBlock from 'storage/jwt-storage-block';

const APIContext = createContext({});

export const APIConsumer = APIContext.Consumer;

export const APIProvider = ({ children }) => {
  const client = useApolloClient();
  const storage = useStorage();

  const createCard = useCallback(
    async cardData => {
      const { data } = await client.mutate({
        mutation: cardsMutations.createCard,
        variables: { data: cardData },
      });
      const card = new Card(data.createCard);
      const storageKey = storage.getItemKey('card', card.id);
      storage.setItem(storageKey, card);
      return card.id;
    },
    [client],
  );

  const createTransaction = useCallback(
    async transactionData => {
      const { data } = await client.mutate({
        mutation: transactionsMutations.createTransaction,
        variables: { data: transactionData },
      });
      const transaction = new Transaction(data.createTransaction);
      const storageKey = storage.getItemKey('transaction', transaction.id);
      storage.setItem(storageKey, transaction);
      return transaction.id;
    },
    [client],
  );

  const deleteCard = useCallback(
    async cardId => {
      const response = client.mutate({
        mutation: cardsMutations.deleteCard,
        variables: { id: cardId },
      });
      if (response.data?.deleteCard) {
        const storageKey = storage.getItemKey('card', cardId);
        await storage.deleteItem(storageKey);
      }
      return cardId;
    },
    [client],
  );

  const deleteTransaction = useCallback(
    async transactionId => {
      const response = await client.mutate({
        mutation: transactionsMutations.deleteTransaction,
        variables: { id: transactionId },
      });
      if (response.data?.deleteTransaction) {
        const storageKey = storage.getItemKey('transaction', transactionId);
        await storage.deleteItem(storageKey);
      }
      return transactionId;
    },
    [client],
  );

  const getAccount = useCallback(async () => {
    const { data } = await client.query({
      query: accountsQueries.account,
    });
    const account = new Account(data.account);
    const storageKey = storage.getItemKey('account');
    storage.setItem(storageKey, account);
    return account.id;
  }, [client]);

  const getCards = useCallback(async () => {
    const { data } = await client.query({
      query: cardsQueries.cards,
    });
    const cardIds = [];
    data.cards.forEach(cardData => {
      const card = new Card(cardData);
      cardIds.push(card.id);
      const storageKey = storage.getItemKey('card', card.id);
      storage.setItem(storageKey, card);
    });
    const storageKey = storage.getItemKey('cards');
    storage.setItem(storageKey, cardIds);
    return cardIds;
  }, [client]);

  const getCategories = useCallback(async () => {
    const { data } = await client.query({
      query: categoriesQueries.categories,
    });
    const categoryIds = [];
    data.categories.forEach(categoryData => {
      const category = new Category(categoryData);
      categoryIds.push(category.id);
      const storageKey = storage.getItemKey('category', category.id);
      storage.setItem(storageKey, category);
    });
    const storageKey = storage.getItemKey('categories');
    storage.setItem(storageKey, categoryIds);
    return categoryIds;
  }, [client]);

  const getDailySpending = useCallback(
    async (startDate, endDate) => {
      const { data } = await client.query({
        query: summariesQueries.dailySpending,
        variables: { endDate, startDate },
      });
      await Promise.all(
        data.dailySpending.map(spending => {
          const storageKey = storage.getItemKey('daily-spending', spending.date);
          return storage.setItem(storageKey, spending);
        }),
      );
    },
    [client],
  );

  const getMonthlySpending = useCallback(
    async (month, filters) => {
      const { data } = await client.query({
        query: summariesQueries.monthlySpending,
        variables: {
          endMonth: month,
          filters,
          startMonth: month,
        },
      });
      await Promise.all(
        data.monthlySpending.map(spending => {
          if (filters?.cardId) {
            const storageKey = storage.getItemKey('monthly-spending', spending.date, filters);
            return storage.setItem(storageKey, spending);
          } else {
            const storageKey = storage.getItemKey('monthly-spending', spending.date);
            return storage.setItem(storageKey, spending);
          }
        }),
      );
    },
    [client],
  );

  const getTransaction = useCallback(
    async transactionId => {
      const { data } = await client.query({
        query: transactionsQueries.transaction,
        variables: { id: transactionId },
      });
      const transaction = new Transaction(data.transaction);
      const storageKey = storage.getItemKey('transaction', transaction.id);
      storage.setItem(storageKey, transaction);
      return transaction.id;
    },
    [client],
  );

  const getTransactions = useCallback(
    async (filters, skip = 0) => {
      const variables = {
        page: { skip },
      };
      if (filters) {
        variables.filters = filters;
      }
      const { data } = await client.query({
        query: transactionsQueries.transactions,
        variables,
      });
      const categoryIds = [];
      data.categories.forEach(categoryData => {
        const category = new Category(categoryData);
        categoryIds.push(category.id);
        const storageKey = storage.getItemKey('category', category.id);
        storage.setItem(storageKey, category);
      });
      let storageKey = storage.getItemKey('categories');
      storage.setItem(storageKey, categoryIds);
      const transactionIds = [];
      data.transactions.forEach(transactionData => {
        const transaction = new Transaction(transactionData);
        transactionIds.push(transaction.id);
        const storageKey = storage.getItemKey('transaction', transaction.id);
        storage.setItem(storageKey, transaction);
      });
      storageKey = storage.getItemKey('transactions', null, { ...filters, skip });
      storage.setItem(storageKey, transactionIds);
      return transactionIds;
    },
    [client],
  );

  const signInWithEmail = useCallback(
    async (email, password) => {
      const { data } = await client.query({
        query: accountsQueries.login,
        variables: { email, password },
      });
      await JWTStorageBlock.set(data.login);
    },
    [client],
  );

  const updateAccount = useCallback(
    async updateData => {
      const { data } = await client.mutate({
        mutation: accountsMutations.updateAccount,
        variables: {
          data: updateData,
        },
      });
      const account = new Account(data.updateAccount);
      const storageKey = storage.getItemKey('account');
      storage.setItem(storageKey, account);
      return account.id;
    },
    [client],
  );

  const updateCard = useCallback(
    async (cardId, updateData) => {
      const { data } = await client.mutate({
        mutation: cardsMutations.updateCard,
        variables: {
          id: cardId,
          data: updateData,
        },
      });
      const card = new Card(data.updateCard);
      const storageKey = storage.getItemKey('card', card.id);
      storage.setItem(storageKey, card);
      return card.id;
    },
    [client],
  );

  const updatePassword = useCallback(
    async (currentPassword, newPassword) => {
      const { data } = await client.mutate({
        mutation: accountsMutations.updatePassword,
        variables: {
          currentPassword,
          newPassword,
        },
      });
      return Boolean(data?.updateAccount);
    },
    [client],
  );

  const updateTransaction = useCallback(
    async (transactionId, updateData) => {
      const { data } = await client.mutate({
        mutation: transactionsMutations.updateTransaction,
        variables: {
          id: transactionId,
          data: updateData,
        },
      });
      const transaction = new Transaction(data.updateTransaction);
      const storageKey = storage.getItemKey('transaction', transaction.id);
      storage.setItem(storageKey, transaction);
      return transaction.id;
    },
    [client],
  );

  const value = {
    createCard,
    createTransaction,
    deleteCard,
    deleteTransaction,
    getAccount,
    getCards,
    getCategories,
    getDailySpending,
    getMonthlySpending,
    getTransaction,
    getTransactions,
    signInWithEmail,
    updateAccount,
    updateCard,
    updatePassword,
    updateTransaction,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

APIProvider.propTypes = {
  children: PropTypes.node,
};

export default APIContext;
