import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import Category from 'models/category';
import Transaction from 'models/transaction';
import React, { useEffect, useMemo, useState } from 'react';

import TransactionRowComponent from './component';

const TransactionRow = ({ transaction, ...props }) => {
  const storage = useStorage();
  const { palette } = useTheme();
  const [card, setCard] = useState(null);
  const [category, setCategory] = useState(null);

  const theme = useMemo(
    () => ({
      transactionRowAmountPositive: {
        color: palette.get('texts.positive'),
      },
      transactionRowIcon: {
        backgroundColor: palette.get('backgrounds.icon'),
        color: palette.get('texts.primary'),
      },
      transactionRowMutedText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  useEffect(() => {
    let isMounted = true;
    let storageKey = storage.getItemKey('card', transaction.cardId);
    storage.getItem(storageKey).then(cachedCard => {
      if (cachedCard && isMounted) {
        setCard(new Card(cachedCard));
      }
    });
    storageKey = storage.getItemKey('category', transaction.categoryId);
    storage.getItem(storageKey).then(cachedCategory => {
      if (cachedCategory && isMounted) {
        setCategory(new Category(cachedCategory));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [transaction]);

  return <TransactionRowComponent {...props} card={card} category={category} theme={theme} transaction={transaction} />;
};

TransactionRow.propTypes = {
  transaction: Transaction.propTypes,
};

export default TransactionRow;
