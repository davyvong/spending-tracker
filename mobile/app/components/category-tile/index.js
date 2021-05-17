import useTheme from 'hooks/theme';
import Category from 'models/category';
import React, { useMemo } from 'react';

import CategoryTileComponent from './component';

const CategoryTile = ({ category, ...props }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      categoryTile: {
        backgroundColor: palette.get('backgrounds.input'),
      },
      categoryTileName: {
        color: palette.get('texts.primary'),
      },
    }),
    [palette],
  );

  return <CategoryTileComponent {...props} category={category} theme={theme} />;
};

CategoryTile.propTypes = {
  category: Category.propTypes.isRequired,
};

export default CategoryTile;
