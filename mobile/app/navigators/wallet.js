import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import CardTransactionListScreen from 'screens/card-transaction-list';
import EditTransactionScreen from 'screens/edit-transaction';
import WalletScreen from 'screens/wallet';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={routeOptions.walletScreen.name}
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        header: Header,
      }}
    >
      <Stack.Screen
        component={WalletScreen}
        name={routeOptions.walletScreen.name}
        options={{
          ...routeOptions.walletScreen,
          title: locale.t(routeOptions.walletScreen.title),
        }}
      />
      <Stack.Screen
        component={CardTransactionListScreen}
        name={routeOptions.cardTransactionListScreen.name}
        options={routeOptions.cardTransactionListScreen}
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

export default WalletNavigator;
