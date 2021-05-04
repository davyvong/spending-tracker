import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const getJWT = async () => {
  let jwt;
  if (await SecureStore.isAvailableAsync()) {
    jwt = await SecureStore.getItemAsync('jwt');
  } else {
    jwt = await AsyncStorage.getItem('jwt');
  }
  return JSON.parse(jwt);
};

export const setJWT = async jwt => {
  const jwtString = JSON.stringify(jwt);
  if (await SecureStore.isAvailableAsync()) {
    await SecureStore.setItemAsync('jwt', jwtString);
  } else {
    await AsyncStorage.setItem('jwt', jwtString);
  }
};

export const deleteJWT = async () => {
  if (await SecureStore.isAvailableAsync()) {
    await SecureStore.deleteItemAsync('jwt');
  } else {
    await AsyncStorage.deleteItem('jwt');
  }
};
