import { fontAssets } from 'constants/fonts';
import { themeModes } from 'contexts/theme/constants';
import * as Font from 'expo-font';
import useAuthentication from 'hooks/authentication';
import useCache from 'hooks/cache';
import useTheme from 'hooks/theme';
import React, { useEffect, useMemo, useState } from 'react';
import SecureJWT from 'storage/jwt';

import AppComponent from './component';

const App = () => {
  const [, setIsLoggedIn] = useAuthentication();
  const [cache] = useCache();
  const { name, palette } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([SecureJWT.get(), Font.loadAsync(fontAssets), cache.rehydrate()]).then(responses => {
      const [jwt] = responses;
      setIsLoggedIn(Boolean(jwt));
      setIsReady(true);
    });
  }, [cache.rehydrate, setIsLoggedIn]);

  const statusBar = useMemo(() => (name === themeModes.light ? 'dark' : 'light'), [name]);

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('appBackground'),
      },
      navigationContainer: {
        colors: {
          background: palette.get('appBackground'),
        },
      },
    }),
    [palette],
  );

  return <AppComponent isReady={isReady} statusBar={statusBar} theme={theme} />;
};

export default App;
