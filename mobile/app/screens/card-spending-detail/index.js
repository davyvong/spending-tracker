import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CardSpendingDetailScreenComponent from './component';

const CardSpendingDetailScreen = ({ navigation, route, ...props }) => {
  const { card, startMonth } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [categorySpending, setCategorySpending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useMemo(
    () => ({
      categorySectionHeaderText: {
        color: palette.get('texts.primary'),
      },
    }),
    [palette],
  );

  const getCategorySpendingFromAPI = useCallback(
    () => api.getCategorySpending(startMonth, { cardId: card?.id }),
    [card, startMonth],
  );

  const getCategorySpendingFromStorage = useCallback(async () => {
    if (card?.id) {
      let storageKey = storage.getItemKey('category-spending', null, {
        cardId: card?.id,
        month: startMonth,
      });
      const categoryList = await storage.getItem(storageKey);
      const categorySpending = [];
      if (Array.isArray(categoryList)) {
        for (let i = 0; i < categoryList.length; i++) {
          storageKey = storage.getItemKey('category-spending', categoryList[i], {
            cardId: card.id,
            month: startMonth,
          });
          const cachedCategorySpending = await storage.getItem(storageKey);
          if (cachedCategorySpending) {
            const spending = cachedCategorySpending.spending.find(spending => spending.type === card.currency);
            const amount = spending ? spending.debit * -1 : 0;
            storageKey = storage.getItemKey('category', cachedCategorySpending.categoryId);
            const cachedCategory = await storage.getItem(storageKey);
            if (amount) {
              categorySpending.push({
                amount,
                categoryId: cachedCategorySpending.categoryId,
                categoryName: cachedCategory?.name,
                transactionCount: cachedCategorySpending.transactionCount,
              });
            }
          }
        }
      }
      categorySpending.sort((a, b) => a.amount > b.amount);
      setCategorySpending(categorySpending);
    }
  }, [card, startMonth]);

  const getCategorySpending = useCallback(
    () =>
      getCategorySpendingFromAPI()
        .then(() => getCategorySpendingFromStorage())
        .catch(() => getCategorySpendingFromStorage()),
    [getCategorySpendingFromAPI, getCategorySpendingFromStorage],
  );

  const refreshCategorySpending = useCallback(async () => {
    setRefreshing(true);
    await getCategorySpending();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategorySpending();
    });
    return () => {
      unsubscribe();
    };
  }, [getCategorySpending, navigation]);

  return (
    <CardSpendingDetailScreenComponent
      {...props}
      card={card}
      categorySpending={categorySpending}
      refreshCategorySpending={refreshCategorySpending}
      refreshing={refreshing}
      theme={theme}
    />
  );
};

CardSpendingDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      card: Card.propTypes.isRequired,
      endMonth: PropTypes.string.isRequired,
      startMonth: PropTypes.string.isRequired,
    }),
  }),
};

export default CardSpendingDetailScreen;
