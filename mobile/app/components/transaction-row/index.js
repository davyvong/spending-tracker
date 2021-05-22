import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import Category from 'models/category';
import Transaction from 'models/transaction';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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

  const getCardFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('card', transaction.cardId);
    const cachedCard = await storage.getItem(storageKey);
    if (cachedCard) {
      setCard(new Card(cachedCard));
    }
  }, [transaction]);

  const getCategoryFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('category', transaction.categoryId);
    const cachedCategory = await storage.getItem(storageKey);
    if (cachedCategory) {
      setCategory(new Category(cachedCategory));
    }
  }, [transaction]);

  useEffect(() => {
    getCardFromStorage();
    getCategoryFromStorage();
  }, [getCardFromStorage, getCategoryFromStorage]);

  return <TransactionRowComponent {...props} card={card} category={category} theme={theme} transaction={transaction} />;
};

TransactionRow.propTypes = {
  transaction: Transaction.propTypes,
};

export default TransactionRow;
