import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import WalletScreenComponent from './component';

const WalletScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [cards, setCards] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));

  const theme = useMemo(
    () => ({
      actionIcon: palette.get('icons.active'),
      defaultIcon: palette.get('icons.default'),
      refreshControl: palette.get('refresh-control'),
    }),
    [palette],
  );

  const selectedCardId = useMemo(() => {
    if (selectedCard) {
      return selectedCard.id;
    }
    return cards.length > 0 ? cards[0].id : null;
  }, [cards, selectedCard]);

  const getCardsFromAPI = useCallback(api.getCards, []);

  const getCardsFromStorage = useCallback(async cardIds => {
    let cardList = Array.from(cardIds);
    for (let i = 0; i < cardList.length; i += 1) {
      const storageKey = storage.getItemKey('card', cardList[i]);
      const cachedCard = await storage.getItem(storageKey);
      if (cachedCard) {
        cardList[i] = new Card(cachedCard);
      }
    }
    setCards(cardList.filter(card => card instanceof Card));
  }, []);

  const getCards = useCallback(
    () =>
      getCardsFromAPI()
        .then(getCardsFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('cards');
          const cachedCardIds = await storage.getItem(storageKey);
          return getCardsFromStorage([...cachedCardIds]);
        }),
    [getCardsFromAPI, getCardsFromStorage],
  );

  const getMonthlySpendingFromAPI = useCallback((month, cardId) => api.getMonthlySpending(month, { cardId }), []);

  const getMonthlySpendingFromStorage = useCallback(async (month, cardId) => {
    let selectedCardId = cardId;
    if (!selectedCardId) {
      const storageKey = storage.getItemKey('cards');
      const cachedCards = await storage.getItem(storageKey);
      if (Array.isArray(cachedCards) && cachedCards.length > 0) {
        selectedCardId = cachedCards[0];
      }
    }
    if (selectedCardId) {
      let storageKey = storage.getItemKey('card', selectedCardId);
      const selectedCard = await storage.getItem(storageKey);
      storageKey = storage.getItemKey('monthly-spending', null, {
        cardId: selectedCardId,
        currency: selectedCard?.currency,
        month,
      });
      const monthlySpending = await storage.getItem(storageKey);
      setMonthlySpending(monthlySpending);
    } else {
      setMonthlySpending(null);
    }
  }, []);

  const getMonthlySpending = useCallback(
    (month, cardId) =>
      getMonthlySpendingFromAPI(month, cardId)
        .then(() => getMonthlySpendingFromStorage(month, cardId))
        .catch(() => getMonthlySpendingFromStorage(month, cardId)),
    [getMonthlySpendingFromAPI, getMonthlySpendingFromStorage],
  );

  const refreshMonthlySpending = useCallback(async () => {
    setRefreshing(true);
    await getMonthlySpending(selectedMonth, selectedCardId);
    setRefreshing(false);
  }, [getMonthlySpending, selectedCardId, selectedMonth]);

  const setCard = useCallback(
    card => {
      setSelectedCard(card);
      getMonthlySpending(selectedMonth, card.id);
    },
    [getMonthlySpending, selectedMonth],
  );

  const setMonth = useCallback(
    month => {
      setSelectedMonth(month);
      if (selectedCardId) {
        getMonthlySpending(month, selectedCardId);
      }
    },
    [getMonthlySpending, selectedCardId],
  );

  const navigateToSummary = useCallback(async () => {
    const storageKey = storage.getItemKey('card', selectedCardId);
    const card = await storage.getItem(storageKey);
    const endDate = moment(selectedMonth).add(1, 'months');
    if (card) {
      navigation.navigate(routeOptions.cardSpendingDetailScreen.name, {
        card,
        endDate: endDate.format('YYYY-MM'),
        startDate: selectedMonth,
        title: card.name,
      });
    }
  }, [selectedMonth, selectedCardId]);

  const navigateToTransactions = useCallback(async () => {
    const storageKey = storage.getItemKey('card', selectedCardId);
    const card = await storage.getItem(storageKey);
    const endDate = moment(selectedMonth).add(1, 'months');
    if (card) {
      navigation.navigate(routeOptions.cardTransactionListScreen.name, {
        card,
        endDate: endDate.format('YYYY-MM'),
        startDate: selectedMonth,
        title: card.name,
      });
    }
  }, [selectedMonth, selectedCardId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCards().then(() => getMonthlySpending(selectedMonth, selectedCardId));
    });
    return () => {
      unsubscribe();
    };
  }, [getCards, getMonthlySpending, navigation, selectedCardId, selectedMonth]);

  return (
    <WalletScreenComponent
      {...props}
      cards={cards}
      monthlySpending={monthlySpending}
      navigateToSummary={navigateToSummary}
      navigateToTransactions={navigateToTransactions}
      refreshing={refreshing}
      refreshMonthlySpending={refreshMonthlySpending}
      selectedMonth={selectedMonth}
      setSelectedCard={setCard}
      setSelectedMonth={setMonth}
      theme={theme}
    />
  );
};

WalletScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export default WalletScreen;
