import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import ProfileScreen from 'screens/profile';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={routeOptions.profileScreen.name}
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        header: Header,
      }}
    >
      <Stack.Screen
        component={ProfileScreen}
        name={routeOptions.profileScreen.name}
        options={{
          ...routeOptions.profileScreen,
          title: locale.t(routeOptions.profileScreen.title),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
