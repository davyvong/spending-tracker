import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Card from 'models/card';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import TransactionFormComponent from './component';

const TransactionForm = ({ updateValue, values, ...props }) => {
  const storage = useStorage();
  const [cardOptions, setCardOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      fieldTitle: {
        color: palette.get('texts.primary'),
      },
      fieldError: {
        color: palette.get('texts.error'),
      },
      transactionItem: {
        backgroundColor: palette.get('backgrounds.input'),
      },
      transactionItemDeleteIcon: {
        color: palette.get('backgrounds.alternate-button'),
      },
      transactionItemMutedText: {
        color: palette.get('texts.muted'),
      },
      transactionItemRowHover: {
        backgroundColor: palette.get('backgrounds.app'),
        shadowColor: palette.get('shadow'),
      },
      transactionItemSkeleton: {
        borderColor: palette.get('border'),
      },
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      cancelButton: {
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
    }),
    [palette],
  );

  const currency = useMemo(() => {
    if (!values.cardId) {
      return null;
    }
    const selectedCard = cardOptions.find(option => option.value === values.cardId);
    if (selectedCard) {
      return selectedCard.currency;
    }
    return null;
  }, [cardOptions, values.cardId]);

  const getCardsFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('cards');
    let cardList = await storage.getItem(storageKey);
    if (cardList) {
      for (let i = 0; i < cardList.length; i += 1) {
        const storageKey = storage.getItemKey('card', cardList[i]);
        const cachedCard = await storage.getItem(storageKey);
        if (cachedCard) {
          cardList[i] = new Card(cachedCard);
        }
      }
      setCardOptions(
        cardList
          .filter(card => card instanceof Card)
          .sort((a, b) => {
            if (a.company === b.company) {
              return a.name > b.name;
            }
            return a.company > b.company;
          })
          .map(card => ({ currency: card.currency, label: `${card.company} ${card.name}`, value: card.id })),
      );
    }
  }, []);

  const getCategoriesFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('categories');
    let categoryList = await storage.getItem(storageKey);
    if (categoryList) {
      for (let i = 0; i < categoryList.length; i += 1) {
        const storageKey = storage.getItemKey('category', categoryList[i]);
        const cachedCategory = await storage.getItem(storageKey);
        if (cachedCategory) {
          categoryList[i] = new Category(cachedCategory);
        }
      }
      setCategoryOptions(
        categoryList
          .filter(category => category instanceof Category)
          .sort((a, b) => a.name > b.name)
          .map(category => ({ label: category.name, value: category.id })),
      );
    }
  }, []);

  const closeItemModal = useCallback(() => setSelectedItem(null), []);

  const applySelectedItem = useCallback(() => {
    if (selectedItem !== null) {
      updateValue('items')(prevState => {
        const { index, ...data } = selectedItem;
        prevState[index] = data;
        return prevState;
      });
    }
    closeItemModal();
  }, [closeItemModal, selectedItem, updateValue]);

  const updateSelectedItem = useCallback(
    key => value => {
      if (selectedItem !== null) {
        setSelectedItem(prevState => ({ ...prevState, [key]: value }));
      }
    },
    [selectedItem],
  );

  const addItem = useCallback(() => {
    updateValue('items')(prevState =>
      prevState.concat({
        amount: '',
        description: '',
      }),
    );
  }, [updateValue]);

  const removeItem = useCallback(
    index => {
      updateValue('items')(prevState => {
        prevState.splice(index, 1);
        return prevState;
      });
    },
    [updateValue],
  );

  useEffect(() => {
    getCardsFromStorage();
    getCategoriesFromStorage();
  }, [getCardsFromStorage, getCategoriesFromStorage]);

  return (
    <TransactionFormComponent
      {...props}
      addItem={addItem}
      applySelectedItem={applySelectedItem}
      cardOptions={cardOptions}
      categoryOptions={categoryOptions}
      closeItemModal={closeItemModal}
      currency={currency}
      removeItem={removeItem}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      theme={theme}
      updateSelectedItem={updateSelectedItem}
      updateValue={updateValue}
      values={values}
    />
  );
};

TransactionForm.defaultProps = {
  editable: true,
};

TransactionForm.propTypes = {
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    cardId: PropTypes.string,
    categoryId: PropTypes.string,
    postDate: PropTypes.string,
    vendor: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
};

export default TransactionForm;
