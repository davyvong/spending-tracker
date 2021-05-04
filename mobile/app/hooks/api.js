import APIContext from 'contexts/api';
import { useContext } from 'react';

const useAPI = () => useContext(APIContext);

export default useAPI;
