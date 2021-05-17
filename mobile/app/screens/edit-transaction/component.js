import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import TransactionForm from 'components/transaction-form';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const EditTransactionScreenComponent = ({
  closeDiscardDialog,
  closeSaveDialog,
  discardDialog,
  errors,
  openSaveDialog,
  navigateBack,
  pendingSave,
  saveDialog,
  saveTransaction,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={openSaveDialog} title={pendingSave ? '' : locale.t('screens.edit-transaction.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, openSaveDialog, pendingSave, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        StickyHeaderComponent={<Title>{locale.t('screens.edit-transaction.title')}</Title>}
      >
        <TransactionForm editable={!pendingSave} errors={errors} updateValue={updateValue} values={values} />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
      </ScrollView>
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.edit-transaction.messages.discard-changes')}
        primaryAction={{
          color: theme.discardButton.backgroundColor,
          label: locale.t('screens.edit-transaction.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.edit-transaction.messages.save-transaction')}
        primaryAction={{
          label: locale.t('screens.edit-transaction.buttons.save'),
          onPress: saveTransaction,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

EditTransactionScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  openSaveDialog: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pendingSave: PropTypes.bool.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  saveTransaction: PropTypes.func.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default EditTransactionScreenComponent;
