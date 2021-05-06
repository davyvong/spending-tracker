import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import TransactionModalComponent from './component';

const TransactionModal = ({ transaction, ...props }) => {
  const [cache] = useCache();
  const { palette } = useTheme();

  const category = useMemo(() => {
    if (!transaction) {
      return null;
    }
    return cache.categoriesById[transaction.categoryId];
  }, [cache.categoriesById, transaction]);

  const theme = useMemo(
    () => ({
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
      },
      cancelButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
    }),
    [palette],
  );

  return <TransactionModalComponent {...props} category={category} theme={theme} transaction={transaction} />;
};

TransactionModal.propTypes = {
  transaction: Transaction.propTypes,
};

export default TransactionModal;
