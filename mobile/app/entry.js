import App from 'core/app';
import ErrorBoundary from 'core/error-boundary';
import 'core/i18n';
import Providers from 'core/providers';
import { registerRootComponent } from 'expo';
import { enableMapSet } from 'immer';
import React from 'react';
import { LogBox } from 'react-native';

enableMapSet();

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);

const Root = () => (
  <ErrorBoundary>
    <Providers>
      <App />
    </Providers>
  </ErrorBoundary>
);

registerRootComponent(Root);
