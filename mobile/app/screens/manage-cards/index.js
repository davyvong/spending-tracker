import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useLocale from 'hooks/locale';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ManageCardsScreenComponent from './component';

const ManageCardsScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [locale] = useLocale();
  const storage = useStorage();
  const { palette } = useTheme();
  const [actionSheet, setActionSheet] = useState(false);
  const [cards, setCards] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const theme = useMemo(
    () => ({
      actionSheetMutedText: {
        color: palette.get('texts.muted'),
      },
      defaultIcon: palette.get('icons.default'),
      deleteButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
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

  const navigateToEditCard = useCallback(() => {
    navigation.navigate(routeOptions.editCardScreen.name, { card: selectedCard });
  }, [navigation, selectedCard]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialog(false);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialog(true);
  }, []);

  const deleteCard = useCallback(async () => {
    const cardId = await api.deleteCard(selectedCard.id).catch();
    const storageKey = storage.getItemKey('cards');
    const cachedCardIds = await storage.getItem(storageKey);
    return getCardsFromStorage(cachedCardIds.filter(id => id !== cardId));
  }, [api.deleteCard, getCards, selectedCard]);

  const actionSheetOptions = useMemo(() => {
    const options = [
      {
        callback: navigateToEditCard,
        icon: 'edit',
        label: locale.t('screens.manage-cards.actions.edit'),
      },
    ];
    if (selectedCard?.visible) {
      options.push({
        callback: async () => {
          await api.updateCard(selectedCard.id, { visible: false });
          return getCards();
        },
        icon: 'visibility-off',
        label: locale.t('screens.manage-cards.actions.hide'),
      });
    } else {
      options.push({
        callback: async () => {
          await api.updateCard(selectedCard.id, { visible: true });
          return getCards();
        },
        icon: 'visibility',
        label: locale.t('screens.manage-cards.actions.show'),
      });
    }
    options.push({
      callback: openDeleteDialog,
      color: palette.get('texts.error'),
      icon: 'delete',
      label: locale.t('screens.manage-cards.actions.delete'),
    });
    return options;
  });

  const closeActionSheet = useCallback(() => {
    setActionSheet(false);
  }, []);

  const openActionSheet = useCallback(card => {
    setSelectedCard(card);
    setActionSheet(true);
  }, []);

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
      actionSheet={actionSheet}
      actionSheetOptions={actionSheetOptions}
      cards={cards}
      closeActionSheet={closeActionSheet}
      closeDeleteDialog={closeDeleteDialog}
      deleteDialog={deleteDialog}
      deleteCard={deleteCard}
      navigateToCreateCard={navigateToCreateCard}
      openActionSheet={openActionSheet}
      refreshing={refreshing}
      refreshCards={refreshCards}
      selectedCard={selectedCard}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
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
