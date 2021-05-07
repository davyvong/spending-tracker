import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routeOptions } from 'constants/routes';
import TabBar from 'core/tab-bar';
import useAuthentication from 'hooks/authentication';
import useLocale from 'hooks/locale';
import React from 'react';
import LoginScreen from 'screens/login';

import ActivityNavigator from './activity';
import CategoriesNavigator from './categories';
import SettingsNavigator from './settings';
import WalletNavigator from './wallet';

const BottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  const [isLoggedIn] = useAuthentication();
  const [locale] = useLocale();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <BottomTab.Navigator
      initialRouteName={routeOptions.walletNavigator.name}
      tabBar={tabBarProps => <TabBar {...tabBarProps} />}
    >
      <BottomTab.Screen
        name={routeOptions.walletNavigator.name}
        component={WalletNavigator}
        options={{
          ...routeOptions.walletNavigator,
          title: locale.t(routeOptions.walletNavigator.title),
        }}
      />
      <BottomTab.Screen
        name={routeOptions.activityNavigator.name}
        component={ActivityNavigator}
        options={{
          ...routeOptions.activityNavigator,
          title: locale.t(routeOptions.activityNavigator.title),
        }}
      />
      <BottomTab.Screen
        name={routeOptions.categoriesNavigator.name}
        component={CategoriesNavigator}
        options={{
          ...routeOptions.categoriesNavigator,
          title: locale.t(routeOptions.categoriesNavigator.title),
        }}
      />
      <BottomTab.Screen
        name={routeOptions.settingsNavigator.name}
        component={SettingsNavigator}
        options={{
          ...routeOptions.settingsNavigator,
          title: locale.t(routeOptions.settingsNavigator.title),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
