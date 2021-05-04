import CacheContext from 'contexts/cache';
import { useContext } from 'react';

const useCache = () => useContext(CacheContext);

export default useCache;
