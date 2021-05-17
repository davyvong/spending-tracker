import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import CategoryListComponent from './component';

const CategoryList = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      refreshControl: palette.get('refresh-control'),
    }),
    [palette],
  );

  return <CategoryListComponent {...props} theme={theme} />;
};

export default CategoryList;
