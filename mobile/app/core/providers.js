import { ApolloProvider } from '@apollo/client';
import { APIProvider } from 'contexts/api';
import { AuthenticationProvider } from 'contexts/authentication';
import { CacheProvider } from 'contexts/cache';
import { LocaleProvider } from 'contexts/locale';
import { ThemeProvider } from 'contexts/theme';
import client from 'graphql/client';
import PropTypes from 'prop-types';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';

const Providers = ({ children }) => (
  <ApolloProvider client={client}>
    <CacheProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <AuthenticationProvider>
            <APIProvider>
              <LocaleProvider>{children}</LocaleProvider>
            </APIProvider>
          </AuthenticationProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </CacheProvider>
  </ApolloProvider>
);

Providers.propTypes = {
  children: PropTypes.node,
};

export default Providers;
