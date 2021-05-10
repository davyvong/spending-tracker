import CategoryTile from 'components/category-tile';
import { getCategoryIcon } from 'components/category-tile/utils';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

import styles from './styles';

const CategoryListComponent = ({ data, ListStickyHeaderComponent, onPressItem, scrollReachedTop, theme, ...props }) => {
  const headerStyle = useMemo(() => {
    const baseHeaderStyle = [styles.headerContent, theme.headerContent];
    if (!scrollReachedTop) {
      return baseHeaderStyle.concat([styles.headerShadow, theme.headerShadow]);
    }
    return baseHeaderStyle;
  }, [scrollReachedTop, theme]);

  const renderItem = useCallback(
    ({ item }) => {
      if (!item || !item.id) {
        const style = { flex: 1, marginBottom: 12, marginHorizontal: 6, padding: 12 };
        return <View style={style} />;
      }
      return <CategoryTile category={item} key={item.id} onPress={() => onPressItem(item)} />;
    },
    [onPressItem],
  );

  const categoriesWithIcons = useMemo(() => {
    const categories = data.filter(c => getCategoryIcon(c.icon));
    if (categories.length % 2 === 1) {
      return [...categories, {}];
    }
    return categories;
  }, [data]);

  return (
    <View style={styles.container}>
      {ListStickyHeaderComponent && (
        <View style={styles.header}>
          <View style={headerStyle}>{ListStickyHeaderComponent}</View>
        </View>
      )}
      <FlatList
        {...props}
        data={categoriesWithIcons}
        keyExtractor={(item, index) => item.id || index}
        numColumns={2}
        renderItem={renderItem}
        scrollEventThrottle={200}
      />
    </View>
  );
};

CategoryListComponent.defaultProps = {
  onPressItem: () => {},
};

CategoryListComponent.propTypes = {
  data: PropTypes.arrayOf(Category.propTypes),
  ListStickyHeaderComponent: PropTypes.node,
  onPressItem: PropTypes.func,
  scrollReachedTop: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CategoryListComponent;
