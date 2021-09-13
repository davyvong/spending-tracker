import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Category from 'models/category';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import CategoryRowComponent from './component';

const CategoryRow = ({ categoryId, ...props }) => {
  const storage = useStorage();
  const { palette } = useTheme();
  const [category, setCategory] = useState(null);

  const theme = useMemo(
    () => ({
      categoryRowAmountPositive: {
        color: palette.get('texts.positive'),
      },
      categoryRowIcon: {
        backgroundColor: palette.get('backgrounds.icon'),
        color: palette.get('texts.primary'),
      },
      categoryRowMutedText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  useEffect(() => {
    let isMounted = true;
    const storageKey = storage.getItemKey('category', categoryId);
    storage.getItem(storageKey).then(cachedCategory => {
      if (cachedCategory && isMounted) {
        setCategory(new Category(cachedCategory));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  return <CategoryRowComponent {...props} category={category} theme={theme} />;
};

CategoryRow.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default CategoryRow;
