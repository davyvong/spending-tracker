import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import WalletScreenComponent from './component';

const WalletScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
  const { palette } = useTheme();
  const [pendingCards, setPendingCards] = useState(false);
  const [pendingSummary, setPendingSummary] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));

  const theme = useMemo(() => ({}), [palette]);

  const cards = useMemo(() => Object.values(cache.cardsById), [cache.cardsById]);

  const selectedCardId = useMemo(() => {
    if (selectedCard) {
      return selectedCard.id;
    }
    return cards.length > 0 ? cards[0].id : null;
  }, [cards, selectedCard]);

  const monthlySpending = useMemo(() => cache.monthlySpending[selectedMonth], [cache.monthlySpending, selectedMonth]);

  const getCards = useCallback(async () => {
    setPendingCards(true);
    await api.getAllCards().catch(console.error);
    setPendingCards(false);
  }, [api.getAllCards]);

  const getCardSummary = useCallback(
    async (cardId, month) => {
      setPendingSummary(true);
      await api.getCardSpending(cardId || selectedCardId, month || selectedMonth).catch(console.error);
      setPendingSummary(false);
    },
    [api.getCardSpending, selectedCardId, selectedMonth],
  );

  const getCardsAndSummaryWithoutLoading = useCallback(async () => {
    const requests = [api.getAllCards().catch(console.error)];
    if (selectedCardId) {
      requests.push(api.getCardSpending(selectedCardId, selectedMonth).catch(console.error));
    }
    await Promise.all(requests);
  }, [api.getAllCards, api.getCardSpending, selectedCardId, selectedMonth]);

  const getCardsAndSummary = useCallback(async () => {
    setRefreshing(true);
    await getCardsAndSummaryWithoutLoading();
    setRefreshing(false);
  }, [getCardsAndSummaryWithoutLoading]);

  const setSelectedCardAndFetch = useCallback(
    card => {
      setSelectedCard(card);
      getCardSummary(card.id);
    },
    [getCardSummary],
  );

  const setSelectedMonthAndFetch = useCallback(
    month => {
      setSelectedMonth(month);
      if (selectedCardId) {
        getCardSummary(selectedCardId, month);
      }
    },
    [getCardSummary, selectedCardId],
  );

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCardsAndSummaryWithoutLoading();
    });
    return () => {
      unsubscribe();
    };
  }, [getCardsAndSummaryWithoutLoading]);

  return (
    <WalletScreenComponent
      {...props}
      cards={cards}
      getCardsAndSummary={getCardsAndSummary}
      monthlySpending={monthlySpending}
      pendingCards={pendingCards}
      pendingSummary={pendingSummary}
      refreshing={refreshing}
      selectedMonth={selectedMonth}
      setSelectedCard={setSelectedCardAndFetch}
      setSelectedMonth={setSelectedMonthAndFetch}
      theme={theme}
    />
  );
};

WalletScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
};

export default WalletScreen;
