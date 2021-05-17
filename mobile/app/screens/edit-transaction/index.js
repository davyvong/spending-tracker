import { useNavigation } from '@react-navigation/native';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import EditTransactionScreenComponent from './component';

const EditTransactionScreen = ({ route, ...props }) => {
  const { transaction } = route.params;

  const api = useAPI();
  const [cache] = useCache();
  const navigation = useNavigation();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [errors, setErrors] = useState({
    amount: null,
    cardId: null,
    categoryId: null,
    currencyCode: null,
    postDate: null,
    server: null,
    type: null,
    vendor: null,
  });
  const [values, setValues] = useState({
    amount: '',
    cardId: null,
    categoryId: null,
    currencyCode: cache.account.preferredCurrency,
    description: '',
    postDate: '',
    type: 'debit',
    vendor: '',
    ...transaction,
    amount: transaction.amount === undefined ? '' : String(transaction.amount),
  });

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('buttonText'),
      cancelButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
      discardButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      serverError: {
        color: palette.get('errorText'),
      },
    }),
    [palette],
  );

  const updateValue = useCallback(
    field => value => {
      setValues(prevState => ({ ...prevState, [field]: value }));
      if (!hasChanges) {
        setHasChanges(true);
      }
    },
    [hasChanges],
  );

  const validateValues = useCallback(() => {
    const { amount, cardId, categoryId, currencyCode, postDate, type, vendor } = values;
    if (!amount || !cardId || !categoryId || !currencyCode || !postDate || !type || !vendor) {
      setErrors({
        amount: amount ? null : 'screens.create-transaction.errors.empty-amount',
        cardId: cardId ? null : 'screens.create-transaction.errors.empty-card',
        categoryId: categoryId ? null : 'screens.create-transaction.errors.empty-category',
        currencyCode: currencyCode ? null : 'screens.create-transaction.errors.empty-currency',
        postDate: postDate ? null : 'screens.create-transaction.errors.empty-date',
        server: null,
        type: type ? null : 'screens.create-transaction.errors.empty-type',
        vendor: vendor ? null : 'screens.create-transaction.errors.empty-vendor',
      });
      return false;
    }
    return true;
  }, [values]);

  const saveTransaction = useCallback(async () => {
    if (validateValues()) {
      setPendingSave(true);
      try {
        await api.updateTransaction(values.id, {
          ...pick(values, 'cardId', 'categoryId', 'currencyCode', 'description', 'postDate', 'type', 'vendor'),
          amount: Number(values.amount),
        });
        navigation.dispatch({
          ignoreDiscard: true,
          payload: { count: 1 },
          type: 'POP',
        });
      } catch (error) {
        console.log(error.message);
        setErrors(prevState => ({
          ...prevState,
          server: 'common.unknown-error',
        }));
      }
      setPendingSave(false);
    }
  }, [api.updateTransaction, navigation, validateValues, values]);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const openSaveDialog = useCallback(() => {
    setSaveDialog(true);
  }, []);

  const navigateBack = useCallback(() => {
    if (discardDialog) {
      navigation.dispatch(discardDialog);
    } else {
      navigation.goBack();
    }
  }, [discardDialog, navigation]);

  const closeDiscardDialog = useCallback(() => {
    setDiscardDialog(false);
  }, []);

  const openDiscardDialog = useCallback((action = false) => {
    setDiscardDialog(action);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', event => {
      const { action } = event.data;
      if (!hasChanges || action.ignoreDiscard) {
        return;
      }
      event.preventDefault();
      openDiscardDialog(action);
    });
    return () => {
      unsubscribe();
    };
  }, [hasChanges, navigation, openDiscardDialog]);

  return (
    <EditTransactionScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      navigateBack={navigateBack}
      openSaveDialog={openSaveDialog}
      pendingSave={pendingSave}
      saveDialog={saveDialog}
      saveTransaction={saveTransaction}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

EditTransactionScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      transaction: Transaction.propTypes,
    }),
  }),
};

export default EditTransactionScreen;
