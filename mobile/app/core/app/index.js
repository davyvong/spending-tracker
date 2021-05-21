import { fontAssets } from 'constants/fonts';
import * as Font from 'expo-font';
import useAuthentication from 'hooks/authentication';
import useCache from 'hooks/cache';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import React, { useEffect, useMemo, useState } from 'react';
import JWTStorageBlock from 'storage/jwt-storage-block';

import AppComponent from './component';

const App = () => {
  const [, setIsLoggedIn] = useAuthentication();
  const [cache] = useCache();
  const storage = useStorage();
  const { palette, statusBar } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([JWTStorageBlock.get(), Font.loadAsync(fontAssets), storage.rehydrate(), cache.rehydrate()]).then(
      responses => {
        const [jwt] = responses;
        setIsLoggedIn(Boolean(jwt));
        setIsReady(true);
      },
    );
  }, []);

  const theme = useMemo(
    () => ({
      container: {
        backgroundColor: palette.get('backgrounds.app'),
      },
      navigationContainer: {
        colors: {
          background: palette.get('backgrounds.app'),
        },
      },
    }),
    [palette],
  );

  return <AppComponent isReady={isReady} statusBar={statusBar} theme={theme} />;
};

export default App;
