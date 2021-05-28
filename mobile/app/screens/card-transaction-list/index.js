import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import Card from 'models/card';
import Transaction from 'models/transaction';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import CardTransactionListScreenComponent from './component';

const CardTransactionListScreen = ({ navigation, route, ...props }) => {
  const { card, endDate, startDate } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const [refreshing, setRefreshing] = useState(false);
  const [transactionIds, setTransactionIds] = useState(new Set());
  const [transactionSections, setTransactionSections] = useState([]);

  const getTransactionsFromAPI = useCallback(async skip => {
    let transactionList = await api.getTransactions({ cardId: card.id, endDate, startDate }, skip);
    if (!skip) {
      setTransactionIds(new Set(transactionList));
      return transactionList;
    } else {
      setTransactionIds(prevState => {
        transactionList = new Set([...prevState, ...transactionList]);
        return transactionList;
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
    (skip = 0, reset = false) =>
      getTransactionsFromAPI(skip)
        .then(getTransactionsFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('transactions', null, { cardId: card.id, endDate, startDate, skip });
          const cachedTransactionIds = await storage.getItem(storageKey);
          if (reset) {
            return getTransactionsFromStorage(new Set(cachedTransactionIds));
          }
          return getTransactionsFromStorage(new Set([...transactionIds, ...cachedTransactionIds]));
        }),
    [getTransactionsFromAPI, getTransactionsFromStorage, transactionIds],
  );

  const refreshTransactions = useCallback(async () => {
    setRefreshing(true);
    await getTransactions(0, true);
    setRefreshing(false);
  }, [getTransactions]);

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
      getTransactions={getTransactions}
      getTransactionsFromStorage={getTransactionsFromStorage}
      refreshing={refreshing}
      refreshTransactions={refreshTransactions}
      transactionIds={transactionIds}
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
