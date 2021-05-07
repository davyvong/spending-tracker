import { useApolloClient } from '@apollo/client';
import useAPI from 'hooks/api';
import useAuthentication from 'hooks/authentication';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SecureJWT from 'storage/jwt';
import hexToRGB from 'utils/hex-to-rgb';

import ProfileScreenComponent from './component';

const ProfileScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const client = useApolloClient();
  const [, setIsLoggedIn] = useAuthentication();
  const [cache] = useCache();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    firstName: null,
    lastName: null,
    preferredCurrency: null,
  });
  const [values, setValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    preferredCurrency: '',
    ...cache.account,
  });

  const theme = useMemo(
    () => ({
      discardButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      logoutButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      logoutButtonPressed: {
        backgroundColor: hexToRGB(palette.get('errorBackground'), 0.7),
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
    const { email, firstName, lastName, preferredCurrency } = values;
    if (!email || !firstName || !lastName || !preferredCurrency) {
      setErrors({
        email: email ? null : 'screens.profile.errors.empty-email',
        firstName: firstName ? null : 'screens.profile.errors.empty-first-name',
        lastName: lastName ? null : 'screens.profile.errors.empty-last-name',
        preferredCurrency: preferredCurrency ? null : 'screens.profile.errors.empty-preferred-currency',
        server: null,
      });
      return false;
    }
    return true;
  }, [values]);

  const saveProfile = useCallback(async () => {
    if (validateValues()) {
      setPending(true);
      try {
        await api.updateProfile(values.id, pick(values, 'email', 'firstName', 'lastName', 'preferredCurrency'));
        navigation.dispatch({
          ignoreDiscard: true,
          payload: { count: 1 },
          type: 'POP',
        });
      } catch (error) {
        console.log(error.message);
        setErrors(prevState => ({
          ...prevState,
          server: 'screens.profile.errors.server-error',
        }));
      }
      setPending(false);
    }
  }, [api.updateProfile, navigation, validateValues, values]);

  const logout = useCallback(async () => {
    await SecureJWT.delete();
    client.resetStore();
    setIsLoggedIn(false);
  }, [client, setIsLoggedIn]);

  const closeLogoutDialog = useCallback(() => {
    setLogoutDialog(false);
  }, []);

  const openLogoutDialog = useCallback(() => {
    setLogoutDialog(true);
  }, []);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const navigateBack = useCallback(() => {
    if (discardDialog) {
      navigation.dispatch(discardDialog);
    } else {
      navigation.goBack();
    }
  }, [discardDialog, navigation]);

  const openSaveDialog = useCallback(() => {
    setSaveDialog(true);
  }, []);

  const closeDiscardDialog = useCallback(() => {
    setDiscardDialog(false);
  }, []);

  const openDiscardDialog = useCallback((action = false) => {
    setDiscardDialog(action);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api.getAccount().catch();
    });
    return () => {
      unsubscribe();
    };
  }, [api.getAccount, navigation]);

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
      closeLogoutDialog={closeLogoutDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      logout={logout}
      logoutDialog={logoutDialog}
      navigateBack={navigateBack}
      openLogoutDialog={openLogoutDialog}
      openSaveDialog={openSaveDialog}
      pending={pending}
      saveDialog={saveDialog}
      saveProfile={saveProfile}
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
  }),
};

export default ProfileScreen;
