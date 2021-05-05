import { useApolloClient } from '@apollo/client';
import useCache from 'hooks/cache';
import checkErrors from 'graphql/check-errors';
import * as cardMutations from 'graphql/mutations/cards';
import * as transactionMutations from 'graphql/mutations/transactions';
import * as accountQueries from 'graphql/queries/account';
import * as cardQueries from 'graphql/queries/cards';
import * as categoryQueries from 'graphql/queries/categories';
import * as summaryQueries from 'graphql/queries/summaries';
import * as transactionQueries from 'graphql/queries/transactions';
import Account from 'models/account';
import Card from 'models/card';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { createContext, useCallback } from 'react';
import { setJWT } from 'storage/jwt';

const APIContext = createContext({});

export const APIConsumer = APIContext.Consumer;

export const APIProvider = ({ children }) => {
  const client = useApolloClient();
  const [, updateCache] = useCache();

  const createCard = useCallback(
    async cardData => {
      const { data, errors } = await client.mutate({
        mutation: cardMutations.createCard,
        variables: { data: cardData },
      });
      checkErrors(errors);
      const card = new Card(data.createCard);
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
      const { data, errors } = await client.mutate({
        mutation: transactionMutations.createTransaction,
        variables: { data: transactionData },
      });
      checkErrors(errors);
      const transaction = new Transaction(data.createTransaction);
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
    async cardId =>
      client.mutate({
        mutation: deleteCard,
        variables: { id: cardId },
      }),
    [client, updateCache],
  );

  const deleteTransaction = useCallback(
    async transactionId =>
      client.mutate({
        mutation: deleteTransaction,
        variables: { id: transactionId },
      }),
    [client, updateCache],
  );

  const getAccount = useCallback(async () => {
    const { data, errors } = await client.mutate({
      mutation: accountQueries.account,
    });
    checkErrors(errors);
    const account = new Account(data.account);
    updateCache({ account });
  }, [client, updateCache]);

  const getAllCards = useCallback(async () => {
    const { data, errors } = await client.query({
      query: cardQueries.cards,
    });
    checkErrors(errors);
    const cardsById = {};
    data.cards.forEach(cardData => {
      const card = new Card(cardData);
      cardsById[card.id] = card;
    });
    updateCache({ cardsById });
  }, [client, updateCache]);

  const getAllCategories = useCallback(async () => {
    const { data, errors } = await client.query({
      query: categoryQueries.categories,
    });
    checkErrors(errors);
    const categoriesById = {};
    data.categories.forEach(categoryData => {
      const category = new Category(categoryData);
      categoriesById[category.id] = category;
    });
    updateCache({ categoriesById });
  }, [client, updateCache]);

  const getDailySpending = useCallback(
    async (startDate, endDate) => {
      const { data, errors } = await client.query({
        query: summaryQueries.dailySpending,
        variables: { endDate, startDate },
      });
      checkErrors(errors);
      const dailySpending = {};
      data.dailySpending.forEach(spending => {
        dailySpending[spending.date] = spending;
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
      const { data, errors } = await client.query({
        query: summaryQueries.monthlySpending,
        variables: {
          endDate: month,
          filters: { cardId },
          startDate: month,
        },
      });
      checkErrors(errors);
      const monthlySpending = {};
      data.monthlySpending.forEach(month => {
        if (cardId) {
          monthlySpending[month.date + cardId] = month;
        } else {
          monthlySpending[month.date] = month;
        }
      });
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
      const { data, errors } = await client.query({
        query: transactionQueries.transaction,
        variables: { id: transactionId },
      });
      checkErrors(errors);
      const transaction = new Transaction(data.transaction);
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
    async (skip = 0) => {
      const { data, errors } = await client.query({
        query: transactionQueries.transactions,
        variables: {
          page: { skip },
        },
      });
      checkErrors(errors);
      const categoriesById = {};
      data.categories.forEach(categoryData => {
        const category = new Category(categoryData);
        categoriesById[category.id] = category;
      });
      const transactionsById = {};
      const transactionList = [];
      data.transactions.forEach(transactionData => {
        const transaction = new Transaction(transactionData);
        transactionsById[transaction.id] = transaction;
        transactionList.push(transaction.id);
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

  const getTransactionsInCategory = useCallback(
    async (categoryId, skip) => {
      const { data, errors } = await client.query({
        query: transactionQueries.transactions,
        variables: {
          filters: { categoryId },
          page: { skip },
        },
      });
      checkErrors(errors);
      const transactionsById = {};
      const transactionList = [];
      data.transactions.forEach(transactionData => {
        const transaction = new Transaction(transactionData);
        transactionsById[transaction.id] = transaction;
        transactionList.push(transaction.id);
      });
      updateCache(prevState => ({
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
      const { data, errors } = await client.query({
        query: accountQueries.login,
        variables: { email, password },
      });
      checkErrors(errors);
      await setJWT(data.login);
    },
    [client],
  );

  const updateCard = useCallback(
    async (cardId, updateData) => {
      const { data, errors } = await client.mutate({
        mutation: cardMutations.updateCard,
        variables: {
          id: cardId,
          data: updateData,
        },
      });
      checkErrors(errors);
      const card = new Card(data.updateCard);
      updateCache(prevState => ({
        cardsById: {
          ...prevState.cardsById,
          [card.id]: card,
        },
      }));
    },
    [client, updateCache],
  );

  const updateTransaction = useCallback(
    async (transactionId, updateData) => {
      const { data, errors } = await client.mutate({
        mutation: transactionMutations.updateTransaction,
        variables: {
          id: transactionId,
          data: updateData,
        },
      });
      checkErrors(errors);
      const transaction = new Transaction(data.updateTransaction);
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
    getTransactionsInCategory,
    signInWithEmail,
    updateCard,
    updateTransaction,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

APIProvider.propTypes = {
  children: PropTypes.node,
};

export default APIContext;
