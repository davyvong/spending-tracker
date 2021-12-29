import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import EditCardScreenComponent from './component';

const EditCardScreen = ({ navigation, route, ...props }) => {
  const { card = {} } = route.params;

  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [errors, setErrors] = useState({
    company: null,
    currency: null,
    name: null,
    type: null,
  });
  const [values, setValues] = useState({
    company: '',
    currency: '',
    name: '',
    type: '',
    ...card,
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

  const validateValues = useCallback(() => {
    const { company, currency, name, type } = values;
    if (!company || !currency || !name || !type) {
      setErrors({
        company: company ? null : 'components.card-form.errors.empty-company',
        currency: currency ? null : 'components.card-form.errors.empty-currency',
        name: name ? null : 'components.card-form.errors.empty-name',
        type: type ? null : 'components.card-form.errors.empty-type',
      });
      return false;
    }
    return true;
  }, [values]);

  const saveCard = useCallback(async () => {
    setPendingSave(true);
    try {
      const data = pick(values, 'company', 'currency', 'name', 'type');
      await api.updateCard(values.id, data);
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

  const getAccountFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('account');
    const cachedAccount = await storage.getItem(storageKey);
    if (cachedAccount) {
      setValues(prevState => ({
        ...prevState,
        currency: card.currency || cachedAccount.currency,
      }));
    }
  }, [card]);

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
    <EditCardScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      closeErrorDialog={closeErrorDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      errorDialog={errorDialog}
      openSaveDialog={openSaveDialog}
      navigateBack={navigateBack}
      pending={pendingSave}
      saveCard={saveCard}
      saveDialog={saveDialog}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

EditCardScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      card: Card.propTypes,
    }),
  }),
};

export default EditCardScreen;
