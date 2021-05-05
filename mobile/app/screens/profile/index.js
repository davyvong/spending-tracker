import { getApolloClient } from 'graphql/client';
import useAPI from 'hooks/api';
import useAuthentication from 'hooks/authentication';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SecureJWT from 'storage/jwt';
import hexToRGB from 'utils/hex-to-rgb';

import ProfileScreenComponent from './component';

const ProfileScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [, setIsLoggedIn] = useAuthentication();
  const [cache] = useCache();
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
    getApolloClient().resetStore();
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const closeLogoutDialog = useCallback(() => {
    setLogoutDialog(false);
  }, []);

  const openLogoutDialog = useCallback(() => {
    setLogoutDialog(true);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api.getAccount().catch(console.error);
    });
    return () => {
      unsubscribe();
    };
  }, [api.getAccount, navigation]);

  return (
    <ProfileScreenComponent
      {...props}
      account={cache.account}
      closeLogoutDialog={closeLogoutDialog}
      logout={logout}
      logoutDialog={logoutDialog}
      openLogoutDialog={openLogoutDialog}
      theme={theme}
    />
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }),
};

export default ProfileScreen;
