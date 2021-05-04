import AuthenticationContext from 'contexts/authentication';
import { useContext } from 'react';

const useAuthentication = () => useContext(AuthenticationContext);

export default useAuthentication;
