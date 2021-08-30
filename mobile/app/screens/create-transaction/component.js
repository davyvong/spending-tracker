import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import TransactionForm from 'components/transaction-form';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const CreateTransactionScreenComponent = ({
  closeDiscardDialog,
  closeErrorDialog,
  createTransaction,
  discardDialog,
  errors,
  errorDialog,
  navigateBack,
  pending,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={createTransaction} title={pending ? '' : locale.t('screens.create-transaction.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, createTransaction, pending, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <TransactionForm
        editable={!pending}
        errors={errors}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.createTransactionScreen.title)}</Title>}
        updateValue={updateValue}
        values={values}
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
      <ActionDialog
        hideSecondary
        onClose={closeErrorDialog}
        message={locale.t('common.unknown-error')}
        primaryAction={{ onPress: closeErrorDialog }}
        visible={errorDialog}
      />
    </View>
  );
};

CreateTransactionScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeErrorDialog: PropTypes.func.isRequired,
  createTransaction: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  errorDialog: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default CreateTransactionScreenComponent;
