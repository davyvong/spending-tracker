import AsyncStorage from '@react-native-async-storage/async-storage';

export const hydrateCache = async () => {
  const cache = await AsyncStorage.getItem('cache');
  return JSON.parse(cache);
};

export const persistCache = async cache => {
  const cacheString = JSON.stringify(cache);
  await AsyncStorage.setItem('cache', cacheString);
};
