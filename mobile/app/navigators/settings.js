import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import CreateCardScreen from 'screens/create-card';
import ManageBarcodesScreen from 'screens/manage-barcodes';
import ManageCardsScreen from 'screens/manage-cards';
import PasswordScreen from 'screens/password';
import ProfileScreen from 'screens/profile';
import SettingsScreen from 'screens/settings';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={routeOptions.settingsScreen.name}
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        gestureEnabled: true,
        header: Header,
      }}
    >
      <Stack.Screen
        component={SettingsScreen}
        name={routeOptions.settingsScreen.name}
        options={{
          ...routeOptions.settingsScreen,
          title: locale.t(routeOptions.settingsScreen.title),
        }}
      />
      <Stack.Screen
        component={CreateCardScreen}
        name={routeOptions.createCardScreen.name}
        options={{
          ...routeOptions.createCardScreen,
          title: locale.t(routeOptions.createCardScreen.title),
        }}
        unmountOnBlur
      />
      <Stack.Screen
        component={ManageBarcodesScreen}
        name={routeOptions.manageBarcodesScreen.name}
        options={{
          ...routeOptions.manageBarcodesScreen,
          title: locale.t(routeOptions.manageBarcodesScreen.title),
        }}
        unmountOnBlur
      />
      <Stack.Screen
        component={ManageCardsScreen}
        name={routeOptions.manageCardsScreen.name}
        options={{
          ...routeOptions.manageCardsScreen,
          title: locale.t(routeOptions.manageCardsScreen.title),
        }}
        unmountOnBlur
      />
      <Stack.Screen
        component={PasswordScreen}
        name={routeOptions.passwordScreen.name}
        options={{
          ...routeOptions.passwordScreen,
          title: locale.t(routeOptions.passwordScreen.title),
        }}
        unmountOnBlur
      />
      <Stack.Screen
        component={ProfileScreen}
        name={routeOptions.profileScreen.name}
        options={{
          ...routeOptions.profileScreen,
          title: locale.t(routeOptions.profileScreen.title),
        }}
        unmountOnBlur
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
