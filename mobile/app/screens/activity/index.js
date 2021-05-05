import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ActivityScreenComponent from './component';

const ActivityScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
  const [pending, setPending] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState(new Set());

  const [dailySpending, recentlySpent] = useMemo(() => {
    const dailySpending = [];
    let recentlySpent = 0;
    const dayCount = 7;
    const currentDate = moment().subtract(dayCount - 1, 'days');
    for (let i = 0; i < dayCount; i += 1) {
      const dateString = currentDate.format('YYYY-MM-DD');
      const cachedSpending = cache.dailySpending[dateString];
      if (cachedSpending) {
        dailySpending.push(cachedSpending);
        recentlySpent += cachedSpending.debit || 0;
      } else {
        dailySpending.push({
          credit: 0,
          currencyCode: cache.account.preferredCurrency,
          date: dateString,
          debit: 0,
        });
      }
      currentDate.add(1, 'days');
    }
    return [dailySpending, recentlySpent];
  }, [cache.account.preferredCurrency, cache.dailySpending]);

  const transactionList = useMemo(() => {
    const transactionMap = Array.from(transactions).reduce((map, id) => {
      const item = cache.transactionsById[id];
      if (!item) {
        return map;
      }
      const { postTime } = item;
      const section = moment(postTime, 'YYYY-MM-DD').isAfter(moment()) ? 'PENDING' : postTime;
      if (map[section]) {
        map[section].data.push(item);
      } else {
        map[section] = {
          data: [item],
          section,
        };
      }
      return map;
    }, {});
    return Object.values(transactionMap);
  }, [cache.transactionsById, transactions]);

  const getDailySpending = useCallback(() => {
    const tempDate = moment();
    const endDate = tempDate.format('YYYY-MM-DD');
    const startDate = tempDate.subtract(6, 'days').format('YYYY-MM-DD');
    return api.getDailySpending(startDate, endDate);
  }, [api.getDailySpending]);

  const getTransactionsWithoutLoading = useCallback(
    async skip => {
      try {
        const transactionPage = await api.getTransactions(skip);
        if (!skip) {
          setTransactions(new Set(transactionPage.list));
        } else {
          setTransactions(prevState => new Set([...prevState, ...transactionPage.list]));
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [api.getTransactions],
  );

  const getSpendingAndTransactions = useCallback(
    async skip => {
      setPending(true);
      await getTransactionsWithoutLoading(skip);
      await getDailySpending().catch();
      setPending(false);
    },
    [getDailySpending, getTransactionsWithoutLoading],
  );

  const navigateToCreateTransaction = useCallback(() => {
    navigation.navigate(routeOptions.createTransactionScreen.name);
  }, [navigation]);

  const navigateToEditTransaction = useCallback(() => {
    const targetTransaction = selectedTransaction;
    setSelectedTransaction(null);
    setTimeout(() => {
      navigation.navigate(routeOptions.editTransactionScreen.name, { transaction: targetTransaction });
    }, 500);
  }, [navigation, selectedTransaction]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactionsWithoutLoading();
      getDailySpending().catch();
    });
    return () => {
      unsubscribe();
    };
  }, [getDailySpending, getTransactionsWithoutLoading, navigation]);

  return (
    <ActivityScreenComponent
      {...props}
      dailySpending={dailySpending}
      getSpendingAndTransactions={getSpendingAndTransactions}
      getTransactionsWithoutLoading={getTransactionsWithoutLoading}
      navigateToCreateTransaction={navigateToCreateTransaction}
      navigateToEditTransaction={navigateToEditTransaction}
      pending={pending}
      recentlySpent={recentlySpent}
      selectedTransaction={selectedTransaction}
      setSelectedTransaction={setSelectedTransaction}
      skip={transactions.size}
      transactions={transactionList}
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
