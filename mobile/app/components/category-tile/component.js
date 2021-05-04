import Text from 'components/text';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { getCategoryIcon } from './utils';

const CategoryTileComponent = ({ category, theme, ...props }) => {
  const ImageComponent = useMemo(() => getCategoryIcon(category.icon), [category.icon]);

  if (!ImageComponent) {
    return null;
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.categoryTile, theme.categoryTile]} {...props}>
      <Text style={[styles.categoryTileName, theme.categoryTileName]}>{category.name}</Text>
      <View style={styles.categoryTileImage}>
        <ImageComponent height="100%" width="100%" />
      </View>
    </TouchableOpacity>
  );
};

CategoryTileComponent.propTypes = {
  category: PropTypes.instanceOf(Category),
  theme: PropTypes.object,
};

export default CategoryTileComponent;
