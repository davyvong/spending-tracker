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
  const [errorDialog, setErrorDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    cardId: null,
    categoryId: null,
    items: null,
    postDate: null,
    vendor: null,
  });
  const [values, setValues] = useState({
    cardId: null,
    categoryId: null,
    postDate: '',
    vendor: '',
    ...transaction,
    items: Array.isArray(transaction.items)
      ? transaction.items.map(item => ({ amount: item.amount?.toString() || '', description: item.description }))
      : [{ amount: '', description: '' }],
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
    }),
    [palette],
  );

  const updateValue = useCallback(
    field => value => {
      setValues(prevState => {
        if (value instanceof Function) {
          return { ...prevState, [field]: value(prevState[field]) };
        }
        return { ...prevState, [field]: value };
      });
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
        const data = pick(values, 'cardId', 'categoryId', 'items', 'postDate', 'vendor');
        data.items = data.items.map(item => ({ ...item, amount: Number(item.amount) }));
        await api.createTransaction(data);
        navigation.dispatch({
          ignoreDiscard: true,
          payload: { count: 1 },
          type: 'POP',
        });
      } catch (error) {
        console.log(error.message);
        setErrorDialog(true);
      }
      setPending(false);
    }
  }, [navigation, validateValues, values]);

  const validateValues = useCallback(() => {
    const { cardId, categoryId, items, postDate, vendor } = values;
    const badItems = items.some(item => Number.isNaN(item.amount) || !item.amount || !item.description);
    if (badItems || !cardId || !categoryId || !postDate || !vendor) {
      setErrors({
        cardId: cardId ? null : 'screens.create-transaction.errors.empty-card',
        categoryId: categoryId ? null : 'screens.create-transaction.errors.empty-category',
        items: badItems ? 'screens.create-transaction.errors.empty-items' : null,
        postDate: postDate ? null : 'screens.create-transaction.errors.empty-date',
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

  const closeErrorDialog = useCallback(() => {
    setErrorDialog(false);
  }, []);

  const getAccountFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('account');
    const cachedAccount = await storage.getItem(storageKey);
    if (cachedAccount) {
      setValues(prevState => ({
        ...prevState,
        currency: transaction.currency || cachedAccount.currency,
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
      closeErrorDialog={closeErrorDialog}
      createTransaction={createTransaction}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      errorDialog={errorDialog}
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
