import { useApolloClient } from '@apollo/client';
import useCache from 'hooks/cache';
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
import SecureJWT from 'storage/jwt';

const APIContext = createContext({});

export const APIConsumer = APIContext.Consumer;

export const APIProvider = ({ children }) => {
  const client = useApolloClient();
  const [cache, updateCache] = useCache();
  const storage = useStorage();

  const createCard = useCallback(
    async cardData => {
      const { data } = await client.mutate({
        mutation: cardsMutations.createCard,
        variables: { data: cardData },
      });
      const card = new Card(data.createCard);
      storage.setItem(`card:${card.id}`, card);
      updateCache(prevState => ({
        cardsById: {
          ...prevState.cardsById,
          [card.id]: card,
        },
      }));
    },
    [client, updateCache],
  );

  const createTransaction = useCallback(
    async transactionData => {
      const { data } = await client.mutate({
        mutation: transactionsMutations.createTransaction,
        variables: { data: transactionData },
      });
      const transaction = new Transaction(data.createTransaction);
      storage.setItem(`transaction:${transaction.id}`, transaction);
      updateCache(prevState => ({
        transactionsById: {
          ...prevState.transactionsById,
          [transaction.id]: transaction,
        },
      }));
    },
    [client, updateCache],
  );

  const deleteCard = useCallback(
    async cardId => {
      const response = client.mutate({
        mutation: cardsMutations.deleteCard,
        variables: { id: cardId },
      });
      if (response.data?.deleteCard) {
        const cardsById = Object.assign({}, cache.cardsById);
        delete cardsById[cardId];
        storage.deleteItem(`card:${cardId}`);
        updateCache({ cardsById });
      }
    },
    [client, updateCache],
  );

  const deleteTransaction = useCallback(
    async transactionId => {
      const response = await client.mutate({
        mutation: transactionsMutations.deleteTransaction,
        variables: { id: transactionId },
      });
      if (response.data?.deleteTransaction) {
        const transactionsById = Object.assign({}, cache.transactionsById);
        delete transactionsById[transactionId];
        storage.deleteItem(`transaction:${transactionId}`);
        updateCache({ transactionsById });
      }
    },
    [cache, client, updateCache],
  );

  const getAccount = useCallback(async () => {
    const { data } = await client.query({
      query: accountsQueries.account,
    });
    const account = new Account(data.account);
    storage.setItem(`account:${account.id}`, account);
    updateCache({ account });
  }, [client, updateCache]);

  const getAllCategories = useCallback(async () => {
    const { data } = await client.query({
      query: categoriesQueries.categories,
    });
    const categoriesById = {};
    data.categories.forEach(categoryData => {
      const category = new Category(categoryData);
      categoriesById[category.id] = category;
      storage.setItem(`category:${category.id}`, category);
    });
    updateCache({ categoriesById });
  }, [client, updateCache]);

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
      const categoriesById = {};
      data.categories.forEach(categoryData => {
        const category = new Category(categoryData);
        categoriesById[category.id] = category;
        storage.setItem(`category:${category.id}`, category);
      });
      const transactionsById = {};
      const transactionList = [];
      data.transactions.forEach(transactionData => {
        const transaction = new Transaction(transactionData);
        transactionsById[transaction.id] = transaction;
        transactionList.push(transaction.id);
        storage.setItem(`transaction:${transaction.id}`, transaction);
      });
      updateCache(prevState => ({
        categoriesById,
        transactionsById: {
          ...prevState.transactionsById,
          ...transactionsById,
        },
      }));
      return {
        list: transactionList,
        skip,
      };
    },
    [client, updateCache],
  );

  const getTransactionsV2 = useCallback(
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
      data.categories.forEach(categoryData => {
        const category = new Category(categoryData);
        const storageKey = storage.getItemKey('category', category.id);
        storage.setItem(storageKey, category);
      });
      const transactionIds = [];
      data.transactions.forEach(transactionData => {
        const transaction = new Transaction(transactionData);
        transactionIds.push(transaction.id);
        const storageKey = storage.getItemKey('transaction', transaction.id);
        storage.setItem(storageKey, transaction);
      });
      const storageKey = storage.getItemKey('transactions', null, { ...filters, skip });
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
      await SecureJWT.set(data.login);
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
      storage.setItem(`account:${account.id}`, account);
      updateCache({ account });
    },
    [client, updateCache],
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
      storage.setItem(`card:${card.id}`, card);
      updateCache(prevState => ({
        cardsById: {
          ...prevState.cardsById,
          [card.id]: card,
        },
      }));
    },
    [client, updateCache],
  );

  const updatePassword = useCallback(
    async (currentPassword, newPassword) =>
      client.mutate({
        mutation: accountsMutations.updatePassword,
        variables: {
          currentPassword,
          newPassword,
        },
      }),
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
      storage.setItem(`transaction:${transaction.id}`, transaction);
      updateCache(prevState => ({
        transactionsById: {
          ...prevState.transactionsById,
          [transaction.id]: transaction,
        },
      }));
    },
    [client, updateCache],
  );

  const value = {
    createCard,
    createTransaction,
    deleteCard,
    deleteTransaction,
    getAccount,
    getAllCategories,
    getCards,
    getDailySpending,
    getMonthlySpending,
    getTransaction,
    getTransactions,
    getTransactionsV2,
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
