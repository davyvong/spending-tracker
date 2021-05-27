import { useApolloClient } from '@apollo/client';
import { routeOptions } from 'constants/routes';
import useAuthentication from 'hooks/authentication';
import useAPI from 'hooks/api';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Account from 'models/account';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import JWTStorageBlock from 'storage/jwt-storage-block';
import { hexToRGB } from 'utils/styles';

import SettingsScreenComponent from './component';

const SettingsScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const client = useApolloClient();
  const [, setIsLoggedIn] = useAuthentication();
  const storage = useStorage();
  const { name: themeName, palette, setTheme } = useTheme();
  const [account, setAccount] = useState(null);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const theme = useMemo(
    () => ({
      activeIcon: palette.get('icons.active'),
      defaultIcon: palette.get('icons.default'),
      logoutButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
      logoutButtonPressed: {
        backgroundColor: hexToRGB(palette.get('backgrounds.alternate-button'), 0.7),
      },
      sectionHeaderText: {
        color: palette.get('texts.primary'),
      },
      selectedValueText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  const getAccountFromAPI = useCallback(api.getAccount, []);

  const getAccountFromStorage = useCallback(async () => {
    const storageKey = storage.getItemKey('account');
    const cachedAccount = await storage.getItem(storageKey);
    if (cachedAccount) {
      const account = new Account(cachedAccount);
      setAccount(account);
    }
  }, []);

  const getAccount = useCallback(() => getAccountFromAPI().then(getAccountFromStorage).catch(getAccountFromStorage), [
    getAccountFromAPI,
    getAccountFromStorage,
  ]);

  const updateAccount = useCallback(
    updateData => api.updateAccount(updateData).then(getAccountFromStorage).catch(getAccountFromStorage),
    [getAccountFromStorage],
  );

  const updateTheme = useCallback(
    async colorScheme => {
      await updateAccount({ theme: colorScheme });
      setTheme(colorScheme);
    },
    [updateAccount],
  );

  const logout = useCallback(async () => {
    await JWTStorageBlock.delete();
    await storage.clear();
    client.resetStore();
    setIsLoggedIn(false);
  }, [client, setIsLoggedIn]);

  const closeLogoutDialog = useCallback(() => {
    setLogoutDialog(false);
  }, []);

  const openLogoutDialog = useCallback(() => {
    setLogoutDialog(true);
  }, []);

  const navigateToPassword = useCallback(() => {
    navigation.navigate(routeOptions.passwordScreen.name);
  }, [navigation]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate(routeOptions.profileScreen.name);
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAccount();
    });
    return () => {
      unsubscribe();
    };
  }, [getAccount, navigation]);

  return (
    <SettingsScreenComponent
      {...props}
      account={account}
      closeLogoutDialog={closeLogoutDialog}
      logout={logout}
      logoutDialog={logoutDialog}
      openLogoutDialog={openLogoutDialog}
      navigateToPassword={navigateToPassword}
      navigateToProfile={navigateToProfile}
      theme={theme}
      themeName={themeName}
      updateAccount={updateAccount}
      updateTheme={updateTheme}
    />
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
};

export default SettingsScreen;
