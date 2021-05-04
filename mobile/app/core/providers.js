import { ApolloProvider } from '@apollo/client';
import { APIProvider } from 'contexts/api';
import { AuthenticationProvider } from 'contexts/authentication';
import { CacheProvider } from 'contexts/cache';
import { DimensionsProvider } from 'contexts/dimensions';
import { LocaleProvider } from 'contexts/locale';
import { ThemeProvider } from 'contexts/theme';
import PropTypes from 'prop-types';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';

import { getApolloClient } from 'graphql/client';

const Providers = ({ children }) => (
  <DimensionsProvider>
    <ApolloProvider client={getApolloClient()}>
      <AppearanceProvider>
        <ThemeProvider>
          <AuthenticationProvider>
            <CacheProvider>
              <APIProvider>
                <LocaleProvider>{children}</LocaleProvider>
              </APIProvider>
            </CacheProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  </DimensionsProvider>
);

Providers.propTypes = {
  children: PropTypes.node,
};

export default Providers;
