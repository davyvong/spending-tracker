import { defaultBarcodeFormat } from 'constants/barcodes';
import useAPI from 'hooks/api';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Barcode from 'models/barcode';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CreateBarcodeScreenComponent from './component';

const CreateBarcodeScreen = ({ navigation, route, ...props }) => {
  const { barcode = {} } = route.params;

  const api = useAPI();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({
    attributes: null,
    format: null,
    name: null,
    value: null,
  });
  const [values, setValues] = useState({
    format: defaultBarcodeFormat,
    name: '',
    value: '',
    ...barcode,
    attributes: Array.isArray(barcode.attributes) ? barcode.attributes : [],
  });

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('texts.button'),
      cancelButton: {
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
      deleteButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
    }),
    [palette],
  );

  const updateValue = useCallback(
    field => value => {
      setValues(prevState => {
        if (value instanceof Function) {
          return { ...prevState, [field]: value(prevState[field]) };
        }
        return { ...prevState, [field]: value };
      });
      if (!hasChanges) {
        setHasChanges(true);
      }
    },
    [hasChanges],
  );

  const createBarcode = useCallback(async () => {
    if (validateValues()) {
      setPending(true);
      try {
        const data = pick(values, 'attributes', 'format', 'name', 'value');
        await api.createBarcode(data);
        navigation.dispatch({
          ignoreDiscard: true,
          payload: { count: 1 },
          type: 'POP',
        });
      } catch (error) {
        setErrorDialog(true);
      }
      setPending(false);
    }
  }, [navigation, validateValues, values]);

  const validateValues = useCallback(() => {
    const { attributes, format, name, value } = values;
    const badAttributes = attributes.some(item => !item.name || !item.value);
    if (badAttributes || !format || !name || !value) {
      setErrors({
        attributes: badAttributes ? 'components.barcode-form.errors.empty-attributes' : null,
        format: format ? null : 'components.barcode-form.errors.empty-format',
        name: name ? null : 'components.barcode-form.errors.empty-name',
        value: value ? null : 'components.barcode-form.errors.empty-value',
      });
      return false;
    }
    return true;
  }, [values]);

  const navigateBack = useCallback(() => {
    if (discardDialog) {
      navigation.dispatch(discardDialog);
    } else {
      navigation.goBack();
    }
  }, [discardDialog, navigation]);

  const closeDiscardDialog = useCallback(() => {
    setDiscardDialog(false);
  }, []);

  const openDiscardDialog = useCallback((action = false) => {
    setDiscardDialog(action);
  }, []);

  const closeErrorDialog = useCallback(() => {
    setErrorDialog(false);
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
    <CreateBarcodeScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      closeErrorDialog={closeErrorDialog}
      createBarcode={createBarcode}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      errorDialog={errorDialog}
      navigateBack={navigateBack}
      pending={pending}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

CreateBarcodeScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      barcode: Barcode.propTypes,
    }),
  }),
};

export default CreateBarcodeScreen;
