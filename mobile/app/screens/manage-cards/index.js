import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ManageCardsScreenComponent from './component';

const ManageCardsScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [cards, setCards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleLoading, setVisibleLoading] = useState(-1);

  const theme = useMemo(
    () => ({
      activeIcon: palette.get('icons.active'),
      activityIndicator: palette.get('icons.default'),
      defaultIcon: palette.get('icons.default'),
      refreshControl: palette.get('refresh-control'),
    }),
    [palette],
  );

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

  const refreshCards = useCallback(async () => {
    setRefreshing(true);
    await getCards();
    setRefreshing(false);
  }, []);

  const navigateToCreateCard = useCallback(() => {
    navigation.navigate(routeOptions.createCardScreen.name, { card: {} });
  }, [navigation]);

  const updateCardVisibility = useCallback(
    async (id, visible, index) => {
      try {
        setVisibleLoading(index);
        await api.updateCard(id, { visible });
        await getCards();
      } finally {
        setVisibleLoading(-1);
      }
    },
    [api.updateCard],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCards();
    });
    return () => {
      unsubscribe();
    };
  }, [getCards, navigation]);

  return (
    <ManageCardsScreenComponent
      {...props}
      cards={cards}
      navigateToCreateCard={navigateToCreateCard}
      refreshing={refreshing}
      refreshCards={refreshCards}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateCardVisibility={updateCardVisibility}
      visibleLoading={visibleLoading}
    />
  );
};

ManageCardsScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
};

export default ManageCardsScreen;
