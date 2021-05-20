import LRUCache from 'lru-cache';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';
import AsyncStorageManager from 'storage/async-storage-manager';

const StorageContext = createContext({});

export const StorageConsumer = StorageContext.Consumer;

export const StorageProvider = ({ children }) => {
  const lruCache = useMemo(() => new LRUCache(1000), []);

  const storageManager = useMemo(() => new AsyncStorageManager(), []);

  const deleteItem = useCallback(
    key => {
      lruCache.del(key);
      storageManager.deleteItem(key);
    },
    [lruCache, storageManager],
  );

  const getItem = useCallback(
    key => {
      const cachedItem = lruCache.get(key);
      if (cachedItem) {
        return cachedItem;
      }
      return storageManager.getItem(key);
    },
    [lruCache, storageManager],
  );

  const setItem = useCallback(
    (key, item) => {
      lruCache.set(key, JSON.stringify(item));
      storageManager.setItem(key, item);
    },
    [lruCache, storageManager],
  );

  const value = useMemo(
    () => ({
      deleteItem,
      getItem,
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
