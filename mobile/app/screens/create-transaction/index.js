import { getCurrency } from 'constants/currencies';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CreateTransactionScreenComponent from './component';

const CreateTransactionScreen = ({ navigation, route, ...props }) => {
  const { transaction = {} } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [pending, setPending] = useState(false);
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
    cardId: null,
    categoryId: null,
    currencyCode: null,
    description: '',
    postDate: '',
    type: 'debit',
    vendor: '',
    ...transaction,
    amount: transaction?.amount?.toFixed(getCurrency(transaction?.currencyCode)?.precision) || '',
  });

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('texts.button'),
      cancelButton: {
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
      deleteButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
      serverError: {
        color: palette.get('texts.error'),
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

  const createTransaction = useCallback(async () => {
    if (validateValues()) {
      setPending(true);
      try {
        await api.createTransaction({
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
      setPending(false);
    }
  }, [navigation, validateValues, values]);

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

  const getAccountFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('account');
    const cachedAccount = await storage.getItem(storageKey);
    if (cachedAccount) {
      setValues(prevState => ({
        ...prevState,
        currencyCode: transaction.currencyCode || cachedAccount.currencyCode,
      }));
    }
  }, [transaction]);

  useEffect(() => {
    api.getAccount().then(getAccountFromStorage).catch(getAccountFromStorage);
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
    <CreateTransactionScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      createTransaction={createTransaction}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      navigateBack={navigateBack}
      pending={pending}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

CreateTransactionScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      transaction: Transaction.propTypes,
    }),
  }),
};

export default CreateTransactionScreen;
