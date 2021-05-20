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

  const getAllCards = useCallback(async () => {
    const { data } = await client.query({
      query: cardsQueries.cards,
    });
    const cardsById = {};
    data.cards.forEach(cardData => {
      const card = new Card(cardData);
      cardsById[card.id] = card;
      storage.setItem(`card:${card.id}`, card);
    });
    updateCache({ cardsById });
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

  const getDailySpending = useCallback(
    async (startDate, endDate) => {
      const { data } = await client.query({
        query: summariesQueries.dailySpending,
        variables: { endDate, startDate },
      });
      const dailySpending = {};
      data.dailySpending.forEach(spending => {
        dailySpending[spending.date] = spending;
        storage.setItem(`daily-spending:${spending.date}`, spending);
      });
      updateCache(prevState => {
        prevState.dailySpending = {
          ...prevState.dailySpending,
          ...dailySpending,
        };
        return prevState;
      });
    },
    [client, updateCache],
  );

  const getMonthlySpending = useCallback(
    async (cardId, month) => {
      const { data } = await client.query({
        query: summariesQueries.monthlySpending,
        variables: {
          endMonth: month,
          filters: { cardId },
          startMonth: month,
        },
      });
      const monthlySpending = {};
      if (Array.isArray(data.monthlySpending)) {
        data.monthlySpending.forEach(month => {
          if (cardId) {
            monthlySpending[`${month.date}:${cardId}`] = month;
            storage.setItem(`monthly-spending:${month.date}(card:${cardId})`, month);
          } else {
            monthlySpending[month.date] = month;
            storage.setItem(`monthly-spending:${month.date}`, month);
          }
        });
      }
      updateCache(prevState => {
        prevState.monthlySpending = {
          ...prevState.monthlySpending,
          ...monthlySpending,
        };
        return prevState;
      });
    },
    [client, updateCache],
  );

  const getTransaction = useCallback(
    async transactionId => {
      const { data } = await client.query({
        query: transactionsQueries.transaction,
        variables: { id: transactionId },
      });
      const transaction = new Transaction(data.transaction);
      storage.setItem(`transaction:${transaction.id}`, transaction);
      updateCache(prevState => ({
        transactionsById: {
          ...prevState.transactionsById,
          [transaction.id]: transaction,
        },
      }));
      return transaction;
    },
    [client, updateCache],
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
    getAllCards,
    getAllCategories,
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
