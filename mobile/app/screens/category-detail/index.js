import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import buildTransactionSectionMap from 'utils/build-transaction-section-map';

import CategoryDetailScreenComponent from './component';

const CategoryDetailScreen = ({ navigation, route, ...props }) => {
  const { categoryId } = route.params;

  const api = useAPI();
  const [cache] = useCache();
  const [pending, setPending] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState(new Set());

  const category = useMemo(() => cache.categoriesById[categoryId], [cache.categoriesById, categoryId]);

  const transactionList = useMemo(() => buildTransactionSectionMap(transactions, cache.transactionsById), [
    cache.transactionsById,
    transactions,
  ]);

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
    const transaction = selectedTransaction;
    setSelectedTransaction(null);
    setTimeout(() => {
      navigation.navigate(routeOptions.editTransactionScreen.name, { transaction });
    }, 500);
  }, [navigation, selectedTransaction]);

  useEffect(() => {
    getTransactionsWithoutLoading();
  }, [getTransactionsWithoutLoading]);

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
