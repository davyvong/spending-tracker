import * as AccountAPI from 'apis/account';
import * as AuthenticationAPI from 'apis/authentication';
import * as CardsAPI from 'apis/cards';
import * as CategoriesAPI from 'apis/categories';
import * as SummaryAPI from 'apis/summary';
import * as TransactionsAPI from 'apis/transactions';
import useCache from 'hooks/cache';
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
  const [, updateCache] = useCache();

  const checkErrors = useCallback(errors => {
    if (Array.isArray(errors) && errors.length > 0) {
      const [error] = errors;
      throw error;
    }
  }, []);

  const createCard = useCallback(async newCard => {
    const { data, errors } = await CardsAPI.createCard(newCard);
    checkErrors(errors);
    const card = new Card(data.createCard);
    updateCache(prevState => ({
      cardsById: {
        ...prevState.cardsById,
        [card.id]: card,
      },
    }));
  }, []);

  const createTransaction = useCallback(async newTransaction => {
    const { data, errors } = await TransactionsAPI.createTransaction(newTransaction);
    checkErrors(errors);
    const transaction = new Transaction(data.createTransaction);
    updateCache(prevState => ({
      transactionsById: {
        ...prevState.transactionsById,
        [transaction.id]: transaction,
      },
    }));
  }, []);

  const deleteCard = useCallback(async cardId => CardsAPI.deleteCard(cardId), []);

  const deleteTransaction = useCallback(async transactionId => TransactionsAPI.deleteTransaction(transactionId), []);

  const getAccount = useCallback(async () => {
    const { data, errors } = await AccountAPI.getMyAccount();
    checkErrors(errors);
    const account = new Account(data.getMyAccount);
    updateCache({ account });
  }, []);

  const getAllCards = useCallback(async () => {
    const { data, errors } = await CardsAPI.getAllCards();
    checkErrors(errors);
    const cardsById = {};
    data.getAllCards.forEach(cardData => {
      const card = new Card(cardData);
      cardsById[card.id] = card;
    });
    updateCache({ cardsById });
  }, []);

  const getAllCategories = useCallback(async () => {
    const { data, errors } = await CategoriesAPI.getAllCategories();
    checkErrors(errors);
    const categoriesById = {};
    data.getAllCategories.forEach(categoryData => {
      const category = new Category(categoryData);
      categoriesById[category.id] = category;
    });
    updateCache({ categoriesById });
  }, []);

  const getCardSpending = useCallback(async (cardId, month) => {
    const { data, errors } = await SummaryAPI.getCardSpending(cardId, month);
    checkErrors(errors);
    const monthlySpending = {};
    monthlySpending[data.getMonthlySpending.date] = data.getMonthlySpending;
    updateCache(prevState => {
      prevState.monthlySpending = {
        ...prevState.monthlySpending,
        ...monthlySpending,
      };
      return prevState;
    });
  }, []);

  const getDailySpending = useCallback(async () => {
    const { data, errors } = await SummaryAPI.getDailySpending();
    checkErrors(errors);
    const dailySpending = {};
    data.getDailySpending.forEach(spending => {
      dailySpending[spending.date] = spending;
    });
    updateCache(prevState => {
      prevState.dailySpending = {
        ...prevState.dailySpending,
        ...dailySpending,
      };
      return prevState;
    });
  }, []);

  const getMonthlySpending = useCallback(async month => {
    const { data, errors } = await SummaryAPI.getMonthlySpending(month);
    checkErrors(errors);
    const monthlySpending = {};
    monthlySpending[data.getMonthlySpending.date] = data.getMonthlySpending;
    updateCache(prevState => {
      prevState.monthlySpending = {
        ...prevState.monthlySpending,
        ...monthlySpending,
      };
      return prevState;
    });
  }, []);

  const getTransaction = useCallback(async transactionId => {
    const { data, errors } = await TransactionsAPI.getTransaction(transactionId);
    checkErrors(errors);
    const transaction = new Transaction(data.getTransaction);
    updateCache(prevState => ({
      transactionsById: {
        ...prevState.transactionsById,
        [transaction.id]: transaction,
      },
    }));
    return transaction;
  }, []);

  const getTransactions = useCallback(async (skip = 0) => {
    const { data, errors } = await TransactionsAPI.getTransactions(skip);
    checkErrors(errors);
    const categoriesById = {};
    data.getAllCategories.forEach(categoryData => {
      const category = new Category(categoryData);
      categoriesById[category.id] = category;
    });
    const transactionsById = {};
    const transactionList = [];
    data.getTransactions.forEach(transactionData => {
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
  }, []);

  const getTransactionsInCategory = useCallback(async (categoryId, skip) => {
    const { data, errors } = await TransactionsAPI.getTransactionsInCategory(categoryId, skip);
    checkErrors(errors);
    const transactionsById = {};
    const transactionList = [];
    data.getTransactionsInCategory.forEach(transactionData => {
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
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    const { data, errors } = await AuthenticationAPI.signInWithEmail(email, password);
    checkErrors(errors);
    await setJWT(data.signInWithEmail);
  }, []);

  const updateCard = useCallback(async (cardId, updateData) => {
    const { data, errors } = await CardsAPI.updateCard(cardId, updateData);
    checkErrors(errors);
    const card = new Card(data.updateCard);
    updateCache(prevState => ({
      cardsById: {
        ...prevState.cardsById,
        [card.id]: card,
      },
    }));
  }, []);

  const updateTransaction = useCallback(async (transactionId, updateData) => {
    const { data, errors } = await TransactionsAPI.updateTransaction(transactionId, updateData);
    checkErrors(errors);
    const transaction = new Transaction(data.updateTransaction);
    updateCache(prevState => ({
      transactionsById: {
        ...prevState.transactionsById,
        [transaction.id]: transaction,
      },
    }));
  }, []);

  const value = {
    createCard,
    createTransaction,
    deleteCard,
    deleteTransaction,
    getAccount,
    getAllCards,
    getAllCategories,
    getCardSpending,
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
