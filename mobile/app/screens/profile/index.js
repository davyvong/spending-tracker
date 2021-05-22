import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ProfileScreenComponent from './component';

const ProfileScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const storage = useStorage();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    firstName: null,
    lastName: null,
  });
  const [values, setValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('texts.button'),
      discardButton: {
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

  const validateValues = useCallback(() => {
    const { email, firstName, lastName } = values;
    if (!email || !firstName || !lastName) {
      setErrors({
        email: email ? null : 'screens.profile.errors.empty-email',
        firstName: firstName ? null : 'screens.profile.errors.empty-first-name',
        lastName: lastName ? null : 'screens.profile.errors.empty-last-name',
        server: null,
      });
      return false;
    }
    return true;
  }, [values]);

  const saveProfile = useCallback(async () => {
    setPending(true);
    try {
      await api.updateAccount(pick(values, 'email', 'firstName', 'lastName'));
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
  }, [navigation, validateValues, values]);

  const navigateBack = useCallback(() => {
    if (discardDialog) {
      navigation.dispatch(discardDialog);
    } else {
      navigation.goBack();
    }
  }, [discardDialog, navigation]);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const openSaveDialog = useCallback(() => {
    if (validateValues()) {
      setSaveDialog(true);
    }
  }, [validateValues]);

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
        ...cachedAccount,
      }));
    }
  }, []);

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
    <ProfileScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      hasChanges={hasChanges}
      navigateBack={navigateBack}
      openSaveDialog={openSaveDialog}
      pending={pending}
      saveDialog={saveDialog}
      saveProfile={saveProfile}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
};

export default ProfileScreen;
