import useAPI from 'hooks/api';
import useAuthentication from 'hooks/authentication';
import useTheme from 'hooks/theme';
import React, { useCallback, useMemo, useState } from 'react';

import LoginScreenComponent from './component';

const LoginScreen = props => {
  const api = useAPI();
  const [, setIsLoggedIn] = useAuthentication();
  const { palette } = useTheme();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const signInWithEmail = useCallback(async () => {
    const { email, password } = values;
    if (!email || !password) {
      setErrors({
        email: email ? null : 'screens.login.errors.empty-email',
        password: password ? null : 'screens.login.errors.empty-password',
      });
    } else {
      setPending(true);
      try {
        await api.signInWithEmail(email, password);
        setIsLoggedIn(true);
      } catch (error) {
        setErrors({
          email: null,
          password: 'screens.login.errors.invalid-credentials',
        });
        setPending(false);
      }
    }
  }, [api.signInWithEmail, setIsLoggedIn, values]);

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
      errors={errors}
      pending={pending}
      setEmail={setEmail}
      setPassword={setPassword}
      signInWithEmail={signInWithEmail}
      theme={theme}
      values={values}
    />
  );
};

export default LoginScreen;
