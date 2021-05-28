import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { getTransactionSections } from 'screens/activity/utils';

import CategoryDetailScreenComponent from './component';

const CategoryDetailScreen = ({ navigation, route, ...props }) => {
  const { category } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const [refreshing, setRefreshing] = useState(false);
  const [transactionIds, setTransactionIds] = useState(new Set());
  const [transactionSections, setTransactionSections] = useState([]);

  const getTransactionsFromAPI = useCallback(async (skip = 0, reset = false) => {
    let transactionList = await api.getTransactions({ categoryId: category.id }, skip);
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
          const storageKey = storage.getItemKey('transactions', null, { categoryId: category.id, skip });
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactions();
    });
    return () => {
      unsubscribe();
    };
  }, [getTransactions, navigation]);

  return (
    <CategoryDetailScreenComponent
      {...props}
      category={category}
      getTransactions={getTransactions}
      getTransactionsFromStorage={getTransactionsFromStorage}
      refreshing={refreshing}
      refreshTransactions={refreshTransactions}
      transactionIds={transactionIds}
      transactions={transactionSections}
    />
  );
};

CategoryDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      category: Category.propTypes.isRequired,
    }),
  }),
};

export default CategoryDetailScreen;
