import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import Header from 'components/header';
import Text from 'components/text';
import TransactionForm from 'components/transaction-form';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import styles from './styles';

const CreateTransactionScreenComponent = ({
  closeCreateDialog,
  closeDiscardDialog,
  createTransaction,
  discardDialog,
  errors,
  openCreateDialog,
  navigateBack,
  pending,
  createDialog,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.ctaButton, theme.cancelButtonPressed] : [styles.ctaButton, theme.cancelButton]),
    [theme],
  );

  return (
    <View style={styles.container}>
      <Header>
        <Title>{locale.t(routeOptions.createTransactionScreen.title)}</Title>
      </Header>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        style={styles.container}
      >
        <TransactionForm errors={errors} updateValue={updateValue} values={values} />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
        <View style={styles.ctaRow}>
          <Button disabled={pending} onPress={navigateBack} style={getCancelButtonStyle}>
            <Text>{locale.t('screens.create-transaction.buttons.cancel')}</Text>
          </Button>
          <Button
            disabled={pending}
            onPress={openCreateDialog}
            style={styles.ctaButton}
            title={pending ? '' : locale.t('screens.create-transaction.buttons.save')}
          >
            <ActivityIndicator color={theme.activityIndicator} />
          </Button>
        </View>
      </ScrollView>
      <ActionDialog
        onClose={closeCreateDialog}
        message={locale.t('screens.create-transaction.messages.create-transaction')}
        primaryAction={{
          label: locale.t('screens.create-transaction.buttons.save'),
          onPress: createTransaction,
        }}
        visible={createDialog}
      />
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.create-transaction.messages.discard-changes')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.create-transaction.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
    </View>
  );
};

CreateTransactionScreenComponent.propTypes = {
  closeCreateDialog: PropTypes.func.isRequired,
  closeDiscardDialog: PropTypes.func.isRequired,
  createDialog: PropTypes.bool.isRequired,
  createTransaction: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  openCreateDialog: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default CreateTransactionScreenComponent;
