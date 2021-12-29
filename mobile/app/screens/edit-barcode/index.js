import useAPI from 'hooks/api';
import useTheme from 'hooks/theme';
import pick from 'lodash/pick';
import Barcode from 'models/barcode';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import EditBarcodeScreenComponent from './component';

const EditBarcodeScreen = ({ navigation, route, ...props }) => {
  const { barcode = {} } = route.params;

  const api = useAPI();
  const { palette } = useTheme();
  const [hasChanges, setHasChanges] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [errors, setErrors] = useState({
    attributes: null,
    name: null,
    value: null,
  });
  const [values, setValues] = useState({
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

  const validateValues = useCallback(() => {
    const { attributes, name, value } = values;
    const badAttributes = attributes.some(item => !item.name || !item.value);
    if (badAttributes || !name || !value) {
      setErrors({
        attributes: badAttributes ? 'components.barcode-form.errors.empty-attributes' : null,
        name: name ? null : 'components.barcode-form.errors.empty-name',
        value: value ? null : 'components.barcode-form.errors.empty-value',
      });
      return false;
    }
    return true;
  }, [values]);

  const saveBarcode = useCallback(async () => {
    setPendingSave(true);
    try {
      const data = pick(values, 'attributes', 'name', 'value');
      data.attributes = data.attributes.map(attribute => pick(attribute, 'name', 'value'));
      await api.updateBarcode(values.id, data);
      navigation.dispatch({
        ignoreDiscard: true,
        payload: { count: 1 },
        type: 'POP',
      });
    } catch (error) {
      setErrorDialog(true);
    }
    setPendingSave(false);
  }, [navigation, values]);

  const closeSaveDialog = useCallback(() => {
    setSaveDialog(false);
  }, []);

  const openSaveDialog = useCallback(() => {
    if (validateValues()) {
      setSaveDialog(true);
    }
  }, [validateValues]);

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
    <EditBarcodeScreenComponent
      {...props}
      closeDiscardDialog={closeDiscardDialog}
      closeErrorDialog={closeErrorDialog}
      closeSaveDialog={closeSaveDialog}
      discardDialog={Boolean(discardDialog)}
      errors={errors}
      errorDialog={errorDialog}
      navigateBack={navigateBack}
      openSaveDialog={openSaveDialog}
      pending={pendingSave}
      saveBarcode={saveBarcode}
      saveDialog={saveDialog}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
      updateValue={updateValue}
      values={values}
    />
  );
};

EditBarcodeScreen.propTypes = {
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

export default EditBarcodeScreen;
