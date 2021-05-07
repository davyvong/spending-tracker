import { useApolloClient } from '@apollo/client';
import { routeOptions } from 'constants/routes';
import useAuthentication from 'hooks/authentication';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import SecureJWT from 'storage/jwt';
import hexToRGB from 'utils/hex-to-rgb';

import SettingsScreenComponent from './component';

const SettingsScreen = ({ navigation, ...props }) => {
  const client = useApolloClient();
  const [, setIsLoggedIn] = useAuthentication();
  const { palette } = useTheme();
  const [logoutDialog, setLogoutDialog] = useState(false);

  const theme = useMemo(
    () => ({
      logoutButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      logoutButtonPressed: {
        backgroundColor: hexToRGB(palette.get('errorBackground'), 0.7),
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

  const navigateToProfile = useCallback(() => {
    navigation.navigate(routeOptions.profileScreen.name);
  }, [navigation]);

  return (
    <SettingsScreenComponent
      {...props}
      closeLogoutDialog={closeLogoutDialog}
      logout={logout}
      logoutDialog={logoutDialog}
      navigateToProfile={navigateToProfile}
      theme={theme}
      openLogoutDialog={openLogoutDialog}
    />
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default SettingsScreen;
