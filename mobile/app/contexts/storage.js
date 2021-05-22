import AsyncStorage from '@react-native-async-storage/async-storage';
import LRUCache from 'lru-cache';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorageManager from 'storage/async-storage-manager';

const StorageContext = createContext({});

export const StorageConsumer = StorageContext.Consumer;

export const StorageProvider = ({ children }) => {
  const [storageManager, setStorageManager] = useState(new AsyncStorageManager());

  const lruCache = useMemo(() => new LRUCache(1000), []);

  const clear = useCallback(async () => {
    await AsyncStorage.clear();
    setStorageManager(new AsyncStorageManager());
  }, []);

  const deleteItem = useCallback(
    key => {
      lruCache.del(key);
      return storageManager.deleteItem(key);
    },
    [lruCache, storageManager],
  );

  const getItem = useCallback(
    key => {
      const cachedItem = lruCache.get(key);
      if (cachedItem) {
        return JSON.parse(cachedItem);
      }
      return storageManager.getItem(key);
    },
    [lruCache, storageManager],
  );

  const getItemKeyFilters = useCallback(filters => {
    const keys = [];
    for (const key in filters) {
      keys.push(`${key}:${filters[key]}`);
    }
    keys.sort();
    return `(${keys.join(',')})`;
  }, []);

  const getItemKey = useCallback((type, id, filters) => {
    if (!type) {
      return null;
    }
    if (!id && !filters) {
      return type;
    }
    if (!id) {
      return `${type}${getItemKeyFilters(filters)}`;
    }
    if (!filters) {
      return `${type}:${id}`;
    }
    return `${type}:${id}${getItemKeyFilters(filters)}`;
  }, []);

  const setItem = useCallback(
    (key, item) => {
      lruCache.set(key, JSON.stringify(item));
      return storageManager.setItem(key, item);
    },
    [lruCache, storageManager],
  );

  const value = useMemo(
    () => ({
      clear,
      deleteItem,
      getItem,
      getItemKey,
      rehydrate: () => storageManager.rehydrate(),
      persist: () => storageManager.persist(),
      setItem,
    }),
    [getItem, setItem, storageManager],
  );

  useEffect(() => {
    const intervalId = setInterval(() => storageManager.flush(), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

StorageProvider.propTypes = {
  children: PropTypes.node,
};

export default StorageContext;
