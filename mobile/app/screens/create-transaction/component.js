import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
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
  createTransaction,
  discardDialog,
  errors,
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
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        StickyHeaderComponent={<Title>{locale.t(routeOptions.createTransactionScreen.title)}</Title>}
      >
        <TransactionForm editable={!pending} errors={errors} updateValue={updateValue} values={values} />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
      </ScrollView>
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
  closeDiscardDialog: PropTypes.func.isRequired,
  createTransaction: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default CreateTransactionScreenComponent;
