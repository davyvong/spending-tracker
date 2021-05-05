import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default class SecureJWT {
  static async get() {
    let jwt;
    if (await SecureStore.isAvailableAsync()) {
      jwt = await SecureStore.getItemAsync('jwt');
    } else {
      jwt = await AsyncStorage.getItem('jwt');
    }
    return jwt;
  }

  static async set(jwt) {
    if (await SecureStore.isAvailableAsync()) {
      await SecureStore.setItemAsync('jwt', jwt);
    } else {
      await AsyncStorage.setItem('jwt', jwt);
    }
  }

  static async delete() {
    if (await SecureStore.isAvailableAsync()) {
      await SecureStore.deleteItemAsync('jwt');
    } else {
      await AsyncStorage.deleteItem('jwt');
    }
  }
}
