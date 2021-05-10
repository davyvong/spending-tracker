import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TransactionListComponent from './component';

const TransactionList = props => {
  const [cache] = useCache();
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      sectionHeaderText: {
        color: palette.get('primaryText'),
      },
    }),
    [palette],
  );

  return (
    <TransactionListComponent {...props} cards={cache.cardsById} categories={cache.categoriesById} theme={theme} />
  );
};

export default TransactionList;
