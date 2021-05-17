import useAPI from 'hooks/api';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import PasswordScreenComponent from './component';

const PasswordScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    confirmPassword: null,
    currentPassword: null,
    newPassword: null,
    server: null,
  });
  const [values, setValues] = useState({
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
  });

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('buttonText'),
      cancelButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
      discardButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      serverError: {
        color: palette.get('errorText'),
      },
    }),
    [palette],
  );

  const updateValue = useCallback(
    field => value => {
      setValues(prevState => ({ ...prevState, [field]: value }));
      if (!hasChanges) {
        setHasChanges(true);
      }
    },
    [hasChanges],
  );

  const validateValues = useCallback(() => {
    const { confirmPassword, currentPassword, newPassword } = values;
    const validationErrors = {
      confirmPassword: null,
      currentPassword: null,
      newPassword: null,
      server: null,
    };
    if (confirmPassword !== newPassword) {
      validationErrors.confirmPassword = 'screens.password.errors.mismatch-password';
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = 'screens.password.errors.empty-confirm-password';
    }
    if (!currentPassword) {
      validationErrors.confirmPassword = 'screens.password.errors.empty-current-password';
    }
    if (!newPassword) {
      validationErrors.confirmPassword = 'screens.password.errors.empty-new-password';
    }
    if (Object.values(validationErrors).some(field => field)) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  }, [values]);

  const changePassword = useCallback(async () => {
    if (validateValues()) {
      setPending(true);
      try {
        await api.updatePassword(values.currentPassword, values.newPassword);
        navigation.dispatch({
          ignoreDiscard: true,
          payload: { count: 1 },
          type: 'POP',
        });
      } catch (error) {
        console.log(error.message);
        setErrors(prevState => ({
          ...prevState,
          server: 'common.unknown-error',
        }));
      }
      setPending(false);
    }
  }, [api.updatePassword, navigation, validateValues, values]);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const navigateBack = useCallback(() => {
    if (discardDialog) {
      navigation.dispatch(discardDialog);
    } else {
      navigation.goBack();
    }
  }, [discardDialog, navigation]);

  const openSaveDialog = useCallback(() => {
    setSaveDialog(true);
  }, []);

  const closeDiscardDialog = useCallback(() => {
    setDiscardDialog(false);
  }, []);

  const openDiscardDialog = useCallback((action = false) => {
    setDiscardDialog(action);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', event => {
      const { action } = event.data;
      if (!hasChanges || action.ignoreDiscard) {
        return;
      }
      event.preventDefault();
      openDiscardDialog(action);
    });
    return () => {
      unsubscribe();
    };
  }, [hasChanges, navigation, openDiscardDialog]);

  return (
    <PasswordScreenComponent
      {...props}
      changePassword={changePassword}
      closeDiscardDialog={closeDiscardDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      navigateBack={navigateBack}
      openSaveDialog={openSaveDialog}
      pending={pending}
      saveDialog={saveDialog}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

PasswordScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};

export default PasswordScreen;