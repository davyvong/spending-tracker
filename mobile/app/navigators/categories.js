import { createStackNavigator } from '@react-navigation/stack';
import { routeOptions } from 'constants/routes';
import Header from 'core/header';
import useLocale from 'hooks/locale';
import React from 'react';
import CategoryDetailScreen from 'screens/category-detail';
import CategoryListScreen from 'screens/category-list';
import CreateTransactionScreen from 'screens/create-transaction';
import EditTransactionScreen from 'screens/edit-transaction';

const Stack = createStackNavigator();

const CategoriesNavigator = () => {
  const [locale] = useLocale();

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={routeOptions.categoryListScreen.name}
      screenOptions={{
        cardOverlayEnabled: false,
        cardShadowEnabled: false,
        gestureEnabled: true,
        header: Header,
      }}
    >
      <Stack.Screen
        component={CategoryListScreen}
        name={routeOptions.categoryListScreen.name}
        options={{
          ...routeOptions.categoryListScreen,
          title: locale.t(routeOptions.categoryListScreen.title),
        }}
      />
      <Stack.Screen
        component={CategoryDetailScreen}
        name={routeOptions.categoryDetailScreen.name}
        options={routeOptions.categoryDetailScreen}
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

export default CategoriesNavigator;
