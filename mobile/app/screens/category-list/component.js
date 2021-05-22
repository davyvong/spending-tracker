import CategoryList from 'components/category-list';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const CategoryListScreenComponent = ({ categories, navigateToCategoryDetail, refreshing, refreshCategories }) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <CategoryList
        data={categories}
        ListStickyHeaderComponent={<Title>{locale.t(routeOptions.categoryListScreen.title)}</Title>}
        onPressItem={navigateToCategoryDetail}
        onRefresh={refreshCategories}
        refreshing={refreshing}
      />
    </View>
  );
};

CategoryListScreenComponent.propTypes = {
  categories: PropTypes.arrayOf(Category.propTypes),
  navigateToCategoryDetail: PropTypes.func,
  refreshing: PropTypes.bool,
  refreshCategories: PropTypes.func,
};

export default CategoryListScreenComponent;
