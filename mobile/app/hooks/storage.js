import StorageContext from 'contexts/storage';
import { useContext } from 'react';

const useStorage = () => useContext(StorageContext);

export default useStorage;
