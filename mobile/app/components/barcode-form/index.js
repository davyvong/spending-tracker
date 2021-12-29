import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import BarcodeFormComponent from './component';

const BarcodeForm = ({ updateValue, values, ...props }) => {
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      fieldTitle: {
        color: palette.get('texts.primary'),
      },
      fieldError: {
        color: palette.get('texts.error'),
      },
      attribute: {
        backgroundColor: palette.get('backgrounds.input'),
      },
      attributeDeleteIcon: {
        color: palette.get('backgrounds.alternate-button'),
      },
      attributeMutedText: {
        color: palette.get('texts.muted'),
      },
      attributeRowHover: {
        backgroundColor: palette.get('backgrounds.app'),
        shadowColor: palette.get('shadow'),
      },
      attributeSkeleton: {
        borderColor: palette.get('border'),
      },
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      cancelButton: {
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      cancelButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
    }),
    [palette],
  );

  const closeAttributeModal = useCallback(() => setSelectedAttribute(null), []);

  const applySelectedAttribute = useCallback(() => {
    if (selectedAttribute !== null) {
      updateValue('attributes')(prevState => {
        const { index, ...data } = selectedAttribute;
        prevState[index] = data;
        return prevState;
      });
    }
    closeAttributeModal();
  }, [closeAttributeModal, selectedAttribute, updateValue]);

  const updateSelectedAttribute = useCallback(
    key => value => {
      if (selectedAttribute !== null) {
        setSelectedAttribute(prevState => ({ ...prevState, [key]: value }));
      }
    },
    [selectedAttribute],
  );

  const addAttribute = useCallback(() => {
    updateValue('attributes')(prevState =>
      prevState.concat({
        name: '',
        value: '',
      }),
    );
  }, [updateValue]);

  const removeAttribute = useCallback(
    index => {
      updateValue('attributes')(prevState => {
        prevState.splice(index, 1);
        return prevState;
      });
    },
    [updateValue],
  );

  return (
    <BarcodeFormComponent
      {...props}
      addAttribute={addAttribute}
      applySelectedAttribute={applySelectedAttribute}
      closeAttributeModal={closeAttributeModal}
      removeAttribute={removeAttribute}
      selectedAttribute={selectedAttribute}
      setSelectedAttribute={setSelectedAttribute}
      theme={theme}
      updateSelectedAttribute={updateSelectedAttribute}
      updateValue={updateValue}
      values={values}
    />
  );
};

BarcodeForm.defaultProps = {
  editable: true,
};

BarcodeForm.propTypes = {
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    attributes: PropTypes.array,
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default BarcodeForm;
