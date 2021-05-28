import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import Transaction from 'models/transaction';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import ActivityScreenComponent from './component';
import { getBaseDailySpending } from './utils';

const ActivityScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const storage = useStorage();
  const [dailySpending, setDailySpending] = useState(getBaseDailySpending(7));
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
    let storageKey = storage.getItemKey('account');
    const account = await storage.getItem(storageKey);
    for (let i = 0; i < dailySpending.length; i += 1) {
      const stateDailySpending = dailySpending[i];
      storageKey = storage.getItemKey('daily-spending', stateDailySpending.date);
      const cachedDailySpending = await storage.getItem(storageKey);
      if (cachedDailySpending) {
        dailySpendingList.push(cachedDailySpending);
      } else {
        dailySpendingList.push({
          ...stateDailySpending,
          currencyCode: account.currencyCode,
        });
      }
    }
    setDailySpending(dailySpendingList);
  }, [dailySpending]);

  const getDailySpending = useCallback(
    () => getDailySpendingFromAPI().then(getDailySpendingFromStorage).catch(getDailySpendingFromStorage),
    [getDailySpendingFromAPI, getDailySpendingFromStorage],
  );

  const getTransactionsFromAPI = useCallback(async (skip = 0, reset = false) => {
    let transactionList = await api.getTransactions(undefined, skip);
    if (reset) {
      transactionList = new Set(transactionList);
      setTransactionIds(transactionList);
    } else {
      setTransactionIds(prevState => {
        transactionList = new Set([...prevState, ...transactionList]);
        return transactionList;
      });
    }
    return transactionList;
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
    (skip = 0, reset = false) =>
      getTransactionsFromAPI(skip, reset)
        .then(getTransactionsFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('transactions', null, { skip });
          const cachedTransactionIds = await storage.getItem(storageKey);
          if (reset) {
            getTransactionsFromStorage(new Set(cachedTransactionIds));
          } else {
            getTransactionsFromStorage(new Set([...transactionIds, ...cachedTransactionIds]));
          }
        }),
    [getTransactionsFromAPI, getTransactionsFromStorage, transactionIds],
  );

  const refreshTransactions = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getDailySpending(), getTransactions(0, true)]);
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
      getTransactionsFromStorage={getTransactionsFromStorage}
      navigateToCreateTransaction={navigateToCreateTransaction}
      refreshing={refreshing}
      refreshTransactions={refreshTransactions}
      transactionIds={transactionIds}
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
