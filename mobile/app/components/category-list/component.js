import { useScrollToTop } from '@react-navigation/native';
import CategoryTile from 'components/category-tile';
import { getCategoryIcon } from 'components/category-tile/utils';
import ScrollViewStyles from 'components/scroll-view/styles';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, RefreshControl, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const CategoryListComponent = ({
  contentContainerStyle,
  data,
  ListStickyHeaderComponent,
  onPressItem,
  onRefresh,
  refreshing,
  theme,
  ...props
}) => {
  const ref = useRef();

  useScrollToTop(ref);

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
    const categories = data.filter(category => getCategoryIcon(category.name));
    if (categories.length % 2 === 1) {
      return [...categories, {}];
    }
    return categories;
  }, [data]);

  return (
    <View style={ScrollViewStyles.container}>
      {ListStickyHeaderComponent && <View style={ScrollViewStyles.header}>{ListStickyHeaderComponent}</View>}
      <FlatList
        {...props}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        data={categoriesWithIcons}
        keyExtractor={(item, index) => item?.id || `item-${index}`}
        numColumns={2}
        ref={ref}
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        removeClippedSubviews
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
  contentContainerStyle: ViewPropTypes.style,
  data: PropTypes.arrayOf(Category.propTypes),
  ListStickyHeaderComponent: PropTypes.node,
  onPressItem: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export default CategoryListComponent;
