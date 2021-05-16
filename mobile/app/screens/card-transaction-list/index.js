import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import buildTransactionSectionMap from 'utils/build-transaction-section-map';

import CardTransactionListScreenComponent from './component';

const CardTransactionListScreen = ({ route, ...props }) => {
  const { cardId, endDate, startDate } = route.params;

  const api = useAPI();
  const [cache] = useCache();
  const [pending, setPending] = useState(false);
  const [transactions, setTransactions] = useState(new Set());

  const card = useMemo(() => cache.cardsById[cardId], [cache.cardsById, cardId]);

  const transactionList = useMemo(() => buildTransactionSectionMap(transactions, cache.transactionsById), [
    cache.transactionsById,
    transactions,
  ]);

  const getTransactionsWithoutLoading = useCallback(
    async skip => {
      const transactionsInCategory = await api.getTransactions({ cardId, endDate, startDate }, skip).catch();
      if (!skip) {
        setTransactions(new Set(transactionsInCategory.list));
      } else {
        setTransactions(prevState => new Set([...prevState, ...transactionsInCategory.list]));
      }
    },
    [api.getTransactions, cardId, endDate, startDate],
  );

  const getTransactions = useCallback(
    async skip => {
      setPending(true);
      await getTransactionsWithoutLoading(skip);
      setPending(false);
    },
    [getTransactionsWithoutLoading],
  );

  useEffect(() => {
    getTransactionsWithoutLoading();
  }, [getTransactionsWithoutLoading]);

  return (
    <CardTransactionListScreenComponent
      {...props}
      card={card}
      getTransactions={getTransactions}
      getTransactionsWithoutLoading={getTransactionsWithoutLoading}
      pending={pending}
      skip={transactions.size}
      transactions={transactionList}
    />
  );
};

CardTransactionListScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    }),
  }),
};

export default CardTransactionListScreen;
