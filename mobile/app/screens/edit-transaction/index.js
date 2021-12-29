import { useNavigation } from '@react-navigation/native';
import useAPI from 'hooks/api';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import EditTransactionScreenComponent from './component';

const EditTransactionScreen = ({ route, ...props }) => {
  const { transaction = {} } = route.params;

  const api = useAPI();
  const navigation = useNavigation();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
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
      discardButton: {
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

  const validateValues = useCallback(() => {
    const { cardId, categoryId, items, postDate, vendor } = values;
    const badItems = items.some(item => Number.isNaN(item.amount) || !item.amount || !item.description);
    if (badItems || !cardId || !categoryId || !postDate || !vendor) {
      setErrors({
        cardId: cardId ? null : 'components.transaction-form.errors.empty-card',
        categoryId: categoryId ? null : 'components.transaction-form.errors.empty-category',
        items: badItems ? 'components.transaction-form.errors.empty-items' : null,
        postDate: postDate ? null : 'components.transaction-form.errors.empty-date',
        vendor: vendor ? null : 'components.transaction-form.errors.empty-vendor',
      });
      return false;
    }
    return true;
  }, [values]);

  const saveTransaction = useCallback(async () => {
    setPendingSave(true);
    try {
      const data = pick(values, 'cardId', 'categoryId', 'items', 'postDate', 'vendor');
      data.items = data.items.map(item => ({ ...item, amount: Number(item.amount) }));
      await api.updateTransaction(values.id, data);
      navigation.dispatch({
        ignoreDiscard: true,
        payload: { count: 1 },
        type: 'POP',
      });
    } catch (error) {
      setErrorDialog(true);
    }
    setPendingSave(false);
  }, [navigation, values]);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const openSaveDialog = useCallback(() => {
    if (validateValues()) {
      setSaveDialog(true);
    }
  }, [validateValues]);

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
      closeErrorDialog={closeErrorDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      errorDialog={errorDialog}
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
