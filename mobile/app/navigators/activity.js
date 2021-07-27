import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import ActivityScreen from 'screens/activity';
import CreateTransactionScreen from 'screens/create-transaction';
import EditTransactionScreen from 'screens/edit-transaction';

const Stack = createStackNavigator();

const ActivityNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={routeOptions.activityScreen.name}
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        gestureEnabled: true,
        header: Header,
      }}
    >
      <Stack.Screen
        component={ActivityScreen}
        name={routeOptions.activityScreen.name}
        options={{
          ...routeOptions.activityScreen,
          title: locale.t(routeOptions.activityScreen.title),
        }}
      />
      <Stack.Screen
        component={CreateTransactionScreen}
        name={routeOptions.createTransactionScreen.name}
        options={{
          ...routeOptions.createTransactionScreen,
          title: locale.t(routeOptions.createTransactionScreen.title),
        }}
        unmountOnBlur
      />
      <Stack.Screen
        component={EditTransactionScreen}
        name={routeOptions.editTransactionScreen.name}
        options={{
          ...routeOptions.editTransactionScreen,
          title: locale.t(routeOptions.editTransactionScreen.title),
        }}
        unmountOnBlur
      />
    </Stack.Navigator>
  );
};

export default ActivityNavigator;
