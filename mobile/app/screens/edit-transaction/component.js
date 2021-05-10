import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import TransactionForm from 'components/transaction-form';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const EditTransactionScreenComponent = ({
  closeDeleteDialog,
  closeDiscardDialog,
  closeSaveDialog,
  deleteDialog,
  deleteTransaction,
  discardDialog,
  errors,
  openDeleteDialog,
  openSaveDialog,
  navigateBack,
  pendingDelete,
  pendingSave,
  saveDialog,
  saveTransaction,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.ctaButton, theme.cancelButtonPressed] : [styles.ctaButton, theme.cancelButton]),
    [theme],
  );

  const getDeleteButtonStyle = useCallback(
    ({ pressed }) => (pressed ? theme.deleteButtonPressed : theme.deleteButton),
    [theme],
  );

  const renderHeader = useCallback(() => <Title>{locale.t('screens.edit-transaction.title')}</Title>, [locale]);

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button
        disabled={pendingDelete || pendingSave}
        onPress={openDeleteDialog}
        style={getDeleteButtonStyle}
        title={pendingDelete ? '' : locale.t('screens.edit-transaction.buttons.delete')}
      >
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [getDeleteButtonStyle, locale, openDeleteDialog, pendingDelete, pendingSave, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" renderStickyHeader={renderHeader}>
        <TransactionForm
          editable={!pendingDelete && !pendingSave}
          errors={errors}
          updateValue={updateValue}
          values={values}
        />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
        <View style={styles.ctaRow}>
          <Button disabled={pendingDelete || pendingSave} onPress={navigateBack} style={getCancelButtonStyle}>
            <Text>{locale.t('screens.create-transaction.buttons.cancel')}</Text>
          </Button>
          <Button
            disabled={pendingDelete || pendingSave}
            onPress={openSaveDialog}
            style={styles.ctaButton}
            title={pendingSave ? '' : locale.t('screens.edit-transaction.buttons.save-changes')}
          >
            <ActivityIndicator color={theme.activityIndicator} />
          </Button>
        </View>
      </ScrollView>
      <ActionDialog
        onClose={closeDeleteDialog}
        message={locale.t('screens.edit-transaction.messages.delete-transaction')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.edit-transaction.buttons.delete'),
          onPress: deleteTransaction,
        }}
        visible={deleteDialog}
      />
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.edit-transaction.messages.discard-changes')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.edit-transaction.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.edit-transaction.messages.save-transaction')}
        primaryAction={{
          label: locale.t('screens.edit-transaction.buttons.save-changes'),
          onPress: saveTransaction,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

EditTransactionScreenComponent.propTypes = {
  closeDeleteDialog: PropTypes.func.isRequired,
  closeDiscardDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  deleteDialog: PropTypes.bool.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  openDeleteDialog: PropTypes.func.isRequired,
  openSaveDialog: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pendingDelete: PropTypes.bool.isRequired,
  pendingSave: PropTypes.bool.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  saveTransaction: PropTypes.func.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default EditTransactionScreenComponent;
