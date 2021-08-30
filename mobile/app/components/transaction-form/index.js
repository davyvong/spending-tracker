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
          .map(card => ({ label: `${card.company} ${card.name}`, value: card.id })),
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

  useEffect(() => {
    getCardsFromStorage();
    getCategoriesFromStorage();
  }, [getCardsFromStorage, getCategoriesFromStorage]);

  return (
    <TransactionFormComponent
      {...props}
      applySelectedItem={applySelectedItem}
      cardOptions={cardOptions}
      categoryOptions={categoryOptions}
      closeItemModal={closeItemModal}
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
  items: [],
};

TransactionForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    categoryId: PropTypes.string,
  }).isRequired,
};

export default TransactionForm;
