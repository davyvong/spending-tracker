import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import CardSpendingDetailScreen from 'screens/card-spending-detail';
import CardTransactionListScreen from 'screens/card-transaction-list';
import CreateCardScreen from 'screens/create-card';
import CreateTransactionScreen from 'screens/create-transaction';
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
        gestureEnabled: true,
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
        component={CardSpendingDetailScreen}
        name={routeOptions.cardSpendingDetailScreen.name}
        options={routeOptions.cardSpendingDetailScreen}
        unmountOnBlur
      />
      <Stack.Screen
        component={CardTransactionListScreen}
        name={routeOptions.cardTransactionListScreen.name}
        options={routeOptions.cardTransactionListScreen}
        unmountOnBlur
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

export default WalletNavigator;
