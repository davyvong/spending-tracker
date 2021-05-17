import { useNavigation } from '@react-navigation/native';
import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useLocale from 'hooks/locale';
import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';

import TransactionListComponent from './component';

const TransactionList = props => {
  const api = useAPI();
  const [cache] = useCache();
  const [locale] = useLocale();
  const navigation = useNavigation();
  const { palette } = useTheme();
  const [actionSheet, setActionSheet] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [, setPendingDelete] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const theme = useMemo(
    () => ({
      refreshControl: palette.get('refreshControl'),
      sectionHeaderText: {
        color: palette.get('primaryText'),
      },
      deleteButton: {
        backgroundColor: palette.get('errorBackground'),
      },
    }),
    [palette],
  );

  const navigateToEditTransaction = useCallback(() => {
    navigation.navigate(routeOptions.editTransactionScreen.name, { transaction: selectedTransaction });
  }, [navigation, selectedTransaction]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialog(false);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialog(true);
  }, []);

  const deleteTransaction = useCallback(async () => {
    setPendingDelete(true);
    try {
      await api.deleteTransaction(selectedTransaction.id).catch();
      setPendingDelete(false);
    } catch (error) {
      console.log(error.message);
      setPendingDelete(false);
    }
  }, [api.deleteTransaction, selectedTransaction]);

  const actionSheetOptions = useMemo(
    () => [
      {
        callback: navigateToEditTransaction,
        icon: 'edit',
        label: locale.t('components.transaction-list.actions.edit'),
      },
      {
        callback: openDeleteDialog,
        color: palette.get('errorText'),
        icon: 'delete',
        label: locale.t('components.transaction-list.actions.delete'),
      },
    ],
    [locale, navigateToEditTransaction, openDeleteDialog, palette],
  );

  return (
    <TransactionListComponent
      {...props}
      actionSheet={actionSheet}
      actionSheetOptions={actionSheetOptions}
      cards={cache.cardsById}
      categories={cache.categoriesById}
      closeDeleteDialog={closeDeleteDialog}
      deleteDialog={deleteDialog}
      deleteTransaction={deleteTransaction}
      setActionSheet={setActionSheet}
      setSelectedTransaction={setSelectedTransaction}
      theme={theme}
    />
  );
};

export default TransactionList;
