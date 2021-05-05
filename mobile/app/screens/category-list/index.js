import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CategoryListScreenComponent from './component';

const CategoryListScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api.getAllCategories().catch(console.error);
    });
    return () => {
      unsubscribe();
    };
  }, [api.getAllCategories, navigation]);

  const categories = useMemo(() => Object.values(cache.categoriesById).sort((a, b) => a.name > b.name), [
    cache.categoriesById,
  ]);

  const getCategories = useCallback(async () => {
    setPending(true);
    await api.getAllCategories().catch(console.error);
    setPending(false);
  }, [api.getAllCategories]);

  const navigateToCategoryDetail = useCallback(
    category => {
      navigation.navigate(routeOptions.categoryDetailScreen.name, {
        categoryId: category.id,
        title: category.name,
      });
    },
    [navigation],
  );

  return (
    <CategoryListScreenComponent
      {...props}
      categories={categories}
      getCategories={getCategories}
      navigateToCategoryDetail={navigateToCategoryDetail}
      pending={pending}
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
