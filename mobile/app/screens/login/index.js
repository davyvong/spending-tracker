import useAPI from 'hooks/api';
import useAuthentication from 'hooks/authentication';
import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';

import LoginScreenComponent from './component';

const LoginScreen = props => {
  const api = useAPI();
  const [, setIsLoggedIn] = useAuthentication();
  const { palette } = useTheme();
  const [attempting, setAttempting] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const attemptSignIn = useCallback(async () => {
    const { email, password } = values;
    if (!email || !password) {
      setErrors({
        email: email ? null : 'screens.login.errors.empty-email',
        password: password ? null : 'screens.login.errors.empty-password',
      });
    } else {
      setAttempting(true);
      try {
        await api.signInWithEmail(email, password);
        setIsLoggedIn(true);
      } catch (error) {
        setErrors({
          email: null,
          password: 'screens.login.errors.invalid-credentials',
        });
        setAttempting(false);
      }
    }
  }, [api, values]);

  const setEmail = useCallback(text => {
    setValues(prevState => ({ ...prevState, email: text }));
  }, []);

  const setPassword = useCallback(text => {
    setValues(prevState => ({ ...prevState, password: text }));
  }, []);

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('buttonText'),
    }),
    [palette],
  );

  return (
    <LoginScreenComponent
      {...props}
      attempting={attempting}
      attemptSignIn={attemptSignIn}
      errors={errors}
      setEmail={setEmail}
      setPassword={setPassword}
      theme={theme}
      values={values}
    />
  );
};

export default LoginScreen;
