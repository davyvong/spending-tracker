import { useNavigation } from '@react-navigation/native';
import { routeOptions } from 'constants/routes';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';

import TransactionListComponent from './component';

const TransactionList = props => {
  const [cache] = useCache();
  const navigation = useNavigation();
  const { palette } = useTheme();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const theme = useMemo(
    () => ({
      sectionHeaderText: {
        color: palette.get('primaryText'),
      },
    }),
    [palette],
  );

  const navigateToEditTransaction = useCallback(() => {
    const transaction = selectedTransaction;
    setSelectedTransaction(null);
    setTimeout(() => {
      navigation.navigate(routeOptions.editTransactionScreen.name, { transaction });
    }, 500);
  }, [navigation, selectedTransaction]);

  const actions = useMemo(() => [{ callback: navigateToEditTransaction, icon: 'edit', label: 'Edit' }], [
    navigateToEditTransaction,
  ]);

  return (
    <TransactionListComponent
      {...props}
      actions={actions}
      cards={cache.cardsById}
      categories={cache.categoriesById}
      selectedTransaction={selectedTransaction}
      setSelectedTransaction={setSelectedTransaction}
      theme={theme}
    />
  );
};

export default TransactionList;
