import CategoryList from 'components/category-list';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const CategoryListScreenComponent = ({ categories, getCategories, navigateToCategoryDetail, pending }) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <CategoryList
        data={categories}
        ListStickyHeaderComponent={<Title>{locale.t(routeOptions.categoryListScreen.title)}</Title>}
        onPressItem={navigateToCategoryDetail}
        onRefresh={getCategories}
        refreshing={pending}
      />
    </View>
  );
};

CategoryListScreenComponent.propTypes = {
  categories: PropTypes.arrayOf(Category.propTypes),
  getCategories: PropTypes.func,
  navigateToCategoryDetail: PropTypes.func,
  pending: PropTypes.bool,
};

export default CategoryListScreenComponent;
