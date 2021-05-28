import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { getTransactionSections } from 'screens/activity/utils';

import CardTransactionListScreenComponent from './component';

const CardTransactionListScreen = ({ navigation, route, ...props }) => {
  const { card, endDate, startDate } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const [refreshing, setRefreshing] = useState(false);
  const [transactionIds, setTransactionIds] = useState(new Set());
  const [transactionSections, setTransactionSections] = useState([]);

  const getTransactionsFromAPI = useCallback(async (skip = 0, reset = false) => {
    let transactionList = await api.getTransactions({ cardId: card.id, endDate, startDate }, skip);
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

  const getTransactionsFromStorage = useCallback(getTransactionSections(storage, setTransactionSections), []);

  const getTransactions = useCallback(
    (skip = 0, reset = false) =>
      getTransactionsFromAPI(skip, reset)
        .then(getTransactionsFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('transactions', null, { cardId: card.id, endDate, startDate, skip });
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
    await getTransactions(0, true);
    setRefreshing(false);
  }, [getTransactions]);

  const onDeleteTransaction = useCallback(() => {
    getTransactionsFromStorage(transactionIds);
  }, [getTransactionsFromStorage, transactionIds]);

  const onListEndReached = useCallback(() => {
    if (transactionIds.size < 100) {
      getTransactions(transactionIds.size);
    }
  }, [getTransactions, transactionIds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactions();
    });
    return () => {
      unsubscribe();
    };
  }, [getTransactions, navigation]);

  return (
    <CardTransactionListScreenComponent
      {...props}
      card={card}
      onDeleteTransaction={onDeleteTransaction}
      onListEndReached={onListEndReached}
      refreshing={refreshing}
      refreshTransactions={refreshTransactions}
      transactions={transactionSections}
    />
  );
};

CardTransactionListScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      card: Card.propTypes.isRequired,
      endDate: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    }),
  }),
};

export default CardTransactionListScreen;
