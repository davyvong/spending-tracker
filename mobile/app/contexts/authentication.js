import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext({});

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthenticationContext.Provider value={[isLoggedIn, setIsLoggedIn]}>{children}</AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationContext;
