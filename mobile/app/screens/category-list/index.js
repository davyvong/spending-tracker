import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import CategoryListScreenComponent from './component';

const CategoryListScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const storage = useStorage();
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getCategoriesFromAPI = useCallback(api.getCategories, []);

  const getCategoriesFromStorage = useCallback(async categoryIds => {
    let categoryList = Array.from(categoryIds);
    for (let i = 0; i < categoryList.length; i += 1) {
      const storageKey = storage.getItemKey('category', categoryList[i]);
      const cachedCategory = await storage.getItem(storageKey);
      if (cachedCategory) {
        categoryList[i] = new Category(cachedCategory);
      }
    }
    setCategories(categoryList.filter(card => card instanceof Category).sort((a, b) => a.name > b.name));
  }, []);

  const getCategories = useCallback(
    () =>
      getCategoriesFromAPI()
        .then(getCategoriesFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('categories');
          const cachedCategoryIds = await storage.getItem(storageKey);
          return getCategoriesFromStorage([...cachedCategoryIds]);
        }),
    [getCategoriesFromAPI, getCategoriesFromStorage],
  );

  const refreshCategories = useCallback(async () => {
    setRefreshing(true);
    await getCategories();
    setRefreshing(false);
  }, [getCategories]);

  const navigateToCategoryDetail = useCallback(
    category => {
      navigation.navigate(routeOptions.categoryDetailScreen.name, {
        categoryId: category.id,
        title: category.name,
      });
    },
    [navigation],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories();
    });
    return () => {
      unsubscribe();
    };
  }, [getCategories, navigation]);

  return (
    <CategoryListScreenComponent
      {...props}
      categories={categories}
      navigateToCategoryDetail={navigateToCategoryDetail}
      refreshCategories={refreshCategories}
      refreshing={refreshing}
    />
  );
};

CategoryListScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export default CategoryListScreen;
