import { useApolloClient } from '@apollo/client';
import { routeOptions } from 'constants/routes';
import useAuthentication from 'hooks/authentication';
import useAPI from 'hooks/api';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SecureJWT from 'storage/jwt';
import hexToRGB from 'utils/hex-to-rgb';

import SettingsScreenComponent from './component';

const SettingsScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const client = useApolloClient();
  const [, setIsLoggedIn] = useAuthentication();
  const [cache] = useCache();
  const { palette, ...colorScheme } = useTheme();
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

  const navigateToPassword = useCallback(() => {
    navigation.navigate(routeOptions.passwordScreen.name);
  }, [navigation]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate(routeOptions.profileScreen.name);
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api.getAccount().catch();
    });
    return () => {
      unsubscribe();
    };
  }, [api.getAccount, navigation]);

  return (
    <SettingsScreenComponent
      {...props}
      closeLogoutDialog={closeLogoutDialog}
      colorScheme={colorScheme}
      logout={logout}
      logoutDialog={logoutDialog}
      openLogoutDialog={openLogoutDialog}
      navigateToPassword={navigateToPassword}
      navigateToProfile={navigateToProfile}
      currencyCode={cache.account.currencyCode}
      theme={theme}
      updateAccount={api.updateAccount}
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
