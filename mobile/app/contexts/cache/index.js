import PropTypes from 'prop-types';
import React, { createContext, useCallback, useReducer } from 'react';
import { hydrateCache } from 'storage/cache';

import { initialState } from './constants';
import reducer from './reducer';

const CacheContext = createContext({});

export const CacheConsumer = CacheContext.Consumer;

export const CacheProvider = ({ children }) => {
  const [cache, updateCache] = useReducer(reducer, initialState);

  const rehydrateCache = useCallback(async () => {
    const localCache = await hydrateCache();
    await updateCache(localCache);
  }, []);

  const value = {
    ...cache,
    rehydrate: rehydrateCache,
  };

  return <CacheContext.Provider value={[value, updateCache]}>{children}</CacheContext.Provider>;
};

CacheProvider.propTypes = {
  children: PropTypes.node,
};

export default CacheContext;
