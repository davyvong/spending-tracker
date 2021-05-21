import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useStorage from 'hooks/storage';
import Transaction from 'models/transaction';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import ActivityScreenComponent from './component';
import { getBaseDailySpending } from './utils';

const ActivityScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
  const storage = useStorage();
  const [dailySpending, setDailySpending] = useState(getBaseDailySpending(7, cache.account.currencyCode));
  const [refreshing, setRefreshing] = useState(false);
  const [transactionIds, setTransactionIds] = useState(new Set());
  const [transactionSections, setTransactionSections] = useState([]);

  const getDailySpendingFromAPI = useCallback(() => {
    const tempDate = moment();
    const endDate = tempDate.format('YYYY-MM-DD');
    const startDate = tempDate.subtract(6, 'days').format('YYYY-MM-DD');
    return api.getDailySpending(startDate, endDate);
  }, []);

  const getDailySpendingFromStorage = useCallback(async () => {
    const dailySpendingList = [];
    for (let i = 0; i < dailySpending.length; i += 1) {
      const stateDailySpending = dailySpending[i];
      const storageKey = storage.getItemKey('daily-spending', stateDailySpending.date);
      const cachedDailySpending = await storage.getItem(storageKey);
      dailySpendingList.push(cachedDailySpending || stateDailySpending);
    }
    setDailySpending(dailySpendingList);
  }, [dailySpending]);

  const getDailySpending = useCallback(
    () => getDailySpendingFromAPI().then(getDailySpendingFromStorage).catch(getDailySpendingFromStorage),
    [getDailySpendingFromAPI, getDailySpendingFromStorage],
  );

  const getTransactionsFromAPI = useCallback(async skip => {
    let transactionList = await api.getTransactions(undefined, skip);
    if (!skip) {
      setTransactionIds(new Set(transactionList));
      return transactionList;
    } else {
      setTransactionIds(prevState => {
        const transactionSet = new Set([...prevState, ...transactionList]);
        transactionList = Array.from(transactionSet);
        return transactionSet;
      });
      return transactionList;
    }
  }, []);

  const getTransactionsFromStorage = useCallback(async transactionIds => {
    const transactionList = Array.from(transactionIds);
    const transactionSectionMap = {};
    for (let i = 0; i < transactionList.length; i += 1) {
      const storageKey = storage.getItemKey('transaction', transactionList[i]);
      const cachedTransaction = await storage.getItem(storageKey);
      if (cachedTransaction) {
        const transaction = new Transaction(cachedTransaction);
        const { postDate } = transaction;
        const section = moment(postDate, 'YYYY-MM-DD').isAfter(moment()) ? 'PENDING' : postDate;
        if (transactionSectionMap[section]) {
          transactionSectionMap[section].data.push(transaction);
        } else {
          transactionSectionMap[section] = {
            data: [transaction],
            section,
          };
        }
      }
    }
    setTransactionSections(Object.values(transactionSectionMap));
  }, []);

  const getTransactions = useCallback(
    (skip = 0) =>
      getTransactionsFromAPI(skip)
        .then(getTransactionsFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('transactions', null, { skip });
          const cachedTransactionIds = await storage.getItem(storageKey);
          return getTransactionsFromStorage(new Set([...transactionIds, ...cachedTransactionIds]));
        }),
    [getTransactionsFromAPI, getTransactionsFromStorage, transactionIds],
  );

  const refreshTransactions = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getDailySpending(), getTransactions()]);
    setRefreshing(false);
  }, [getDailySpending, getTransactions]);

  const navigateToCreateTransaction = useCallback(() => {
    navigation.navigate(routeOptions.createTransactionScreen.name);
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDailySpending();
      getTransactions();
    });
    return () => {
      unsubscribe();
    };
  }, [getDailySpending, getTransactions, navigation]);

  return (
    <ActivityScreenComponent
      {...props}
      dailySpending={dailySpending}
      getTransactions={getTransactions}
      navigateToCreateTransaction={navigateToCreateTransaction}
      refreshing={refreshing}
      refreshTransactions={refreshTransactions}
      skip={transactionIds.size}
      transactions={transactionSections}
    />
  );
};

ActivityScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export default ActivityScreen;
