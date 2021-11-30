import { useNavigation } from '@react-navigation/native';
import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useLocale from 'hooks/locale';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import TransactionListComponent from './component';

const TransactionList = ({ onDelete, ...props }) => {
  const api = useAPI();
  const [locale] = useLocale();
  const navigation = useNavigation();
  const storage = useStorage();
  const { palette } = useTheme();
  const [actionSheet, setActionSheet] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [, setPendingDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const theme = useMemo(
    () => ({
      refreshControl: palette.get('refresh-control'),
      sectionHeaderText: {
        color: palette.get('texts.primary'),
      },
      deleteButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
      actionSheetTransactionAmountPositive: {
        color: palette.get('texts.positive'),
      },
      actionSheetTransactionMutedText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  const navigateToCopyTransaction = useCallback(() => {
    navigation.navigate(routeOptions.createTransactionScreen.name, { transaction: selectedTransaction });
  }, [navigation, selectedTransaction]);

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
    await api.deleteTransaction(selectedTransaction.id).then(onDelete).catch();
    setPendingDelete(false);
  }, [onDelete, selectedTransaction]);

  const selectTransaction = useCallback(async transaction => {
    setSelectedTransaction(transaction);
    const storageKey = storage.getItemKey('card', transaction.cardId);
    const card = await storage.getItem(storageKey);
    setSelectedCard(card);
    setActionSheet(true);
  }, []);

  const actionSheetOptions = useMemo(
    () => [
      {
        callback: navigateToEditTransaction,
        icon: 'edit',
        label: locale.t('components.transaction-list.actions.edit'),
      },
      {
        callback: navigateToCopyTransaction,
        icon: 'content-copy',
        label: locale.t('components.transaction-list.actions.duplicate'),
      },
      {
        callback: openDeleteDialog,
        color: palette.get('texts.error'),
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
      closeDeleteDialog={closeDeleteDialog}
      deleteDialog={deleteDialog}
      deleteTransaction={deleteTransaction}
      selectedCard={selectedCard}
      selectedTransaction={selectedTransaction}
      selectTransaction={selectTransaction}
      setActionSheet={setActionSheet}
      theme={theme}
    />
  );
};

TransactionList.propTypes = {
  onDelete: PropTypes.func,
};

export default TransactionList;
