import useStorage from 'hooks/storage';
import Card from 'models/card';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import TransactionFormComponent from './component';

const TransactionForm = ({ values, ...props }) => {
  const storage = useStorage();
  const [cardOptions, setCardOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

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

  useEffect(() => {
    getCardsFromStorage();
    getCategoriesFromStorage();
  }, [getCardsFromStorage, getCategoriesFromStorage]);

  return (
    <TransactionFormComponent {...props} cardOptions={cardOptions} categoryOptions={categoryOptions} values={values} />
  );
};

TransactionForm.defaultProps = {
  editable: true,
};

TransactionForm.propTypes = {
  values: PropTypes.shape({
    categoryId: PropTypes.string,
  }).isRequired,
};

export default TransactionForm;
