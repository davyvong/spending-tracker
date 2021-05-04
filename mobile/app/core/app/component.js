import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from 'navigators/main';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native';

import styles from './styles';

const AppComponent = ({ isReady, statusBar, theme }) => {
  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <StatusBar style={statusBar} />
      <NavigationContainer theme={theme.navigationContainer}>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

AppComponent.propTypes = {
  isReady: PropTypes.bool.isRequired,
  statusBar: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default AppComponent;
