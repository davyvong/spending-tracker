import App from 'core/app';
import ErrorBoundary from 'core/error-boundary';
import 'core/i18n';
import Providers from 'core/providers';
import { registerRootComponent } from 'expo';
import { enableMapSet } from 'immer';
import React from 'react';

enableMapSet();

const Root = () => (
  <ErrorBoundary>
    <Providers>
      <App />
    </Providers>
  </ErrorBoundary>
);

registerRootComponent(Root);
