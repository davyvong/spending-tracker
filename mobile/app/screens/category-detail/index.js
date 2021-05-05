import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CategoryDetailScreenComponent from './component';

const CategoryDetailScreen = ({ navigation, route, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
  const [pending, setPending] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState(new Set());

  const { categoryId } = route.params;

  useEffect(() => {
    getTransactionsWithoutLoading();
  }, [getTransactionsWithoutLoading]);

  const category = useMemo(() => cache.categoriesById[categoryId], [cache.categoriesById, categoryId]);

  const transactionList = useMemo(() => {
    const transactionMap = Array.from(transactions).reduce((map, id) => {
      const item = cache.transactionsById[id];
      if (!item) {
        return map;
      }
      const section = moment(item.postTime, 'YYYY-MM-DD').isAfter(moment()) ? 'PENDING' : item.postTime;
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

  const getTransactionsWithoutLoading = useCallback(
    async skip => {
      const transactionsInCategory = await api.getTransactionsInCategory(categoryId, skip).catch();
      if (!skip) {
        setTransactions(new Set(transactionsInCategory.list));
      } else {
        setTransactions(prevState => new Set([...prevState, ...transactionsInCategory.list]));
      }
    },
    [api.getTransactionsInCategory, categoryId],
  );

  const getTransactions = useCallback(
    async skip => {
      setPending(true);
      await getTransactionsWithoutLoading(skip);
      setPending(false);
    },
    [getTransactionsWithoutLoading],
  );

  const navigateToEditTransaction = useCallback(() => {
    const targetTransaction = selectedTransaction;
    setSelectedTransaction(null);
    setTimeout(() => {
      navigation.navigate(routeOptions.editTransactionScreen.name, { transaction: targetTransaction });
    }, 500);
  }, [navigation, selectedTransaction]);

  return (
    <CategoryDetailScreenComponent
      {...props}
      category={category}
      getTransactions={getTransactions}
      getTransactionsWithoutLoading={getTransactionsWithoutLoading}
      navigateToEditTransaction={navigateToEditTransaction}
      pending={pending}
      selectedTransaction={selectedTransaction}
      setSelectedTransaction={setSelectedTransaction}
      skip={transactions.size}
      transactions={transactionList}
    />
  );
};

CategoryDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
    }),
  }),
};

export default CategoryDetailScreen;
