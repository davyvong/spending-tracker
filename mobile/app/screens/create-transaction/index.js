import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CreateTransactionScreenComponent from './component';

const CreateTransactionScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [cache] = useCache();
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
    amount: '',
    cardId: null,
    categoryId: null,
    currencyCode: cache.account.preferredCurrency,
    description: '',
    postDate: '',
    type: 'debit',
    vendor: '',
  });

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
          ...values,
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
  }, [api.createTransaction, navigation, validateValues, values]);

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
};

export default CreateTransactionScreen;
