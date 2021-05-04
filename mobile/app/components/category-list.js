import CategoryTile from 'components/category-tile';
import { getCategoryIcon } from 'components/category-tile/utils';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

const CategoryList = ({ data, onPressItem, ...props }) => {
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
    <FlatList
      {...props}
      data={categoriesWithIcons}
      keyExtractor={(item, index) => item.id || index}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

CategoryList.defaultProps = {
  onPressItem: () => {},
};

CategoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Category)),
  onPressItem: PropTypes.func,
};

export default CategoryList;
