import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import WalletScreen from 'screens/wallet';

const Stack = createStackNavigator();

const WalletNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="none"
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
    </Stack.Navigator>
  );
};

export default WalletNavigator;
