import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import RadioPickerModalComponent from './component';

const RadioPickerModal = ({ onChange, options, value, ...props }) => {
  const { palette } = useTheme();
  const [pending, setPending] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [visible, setVisible] = useState(false);

  const theme = useMemo(
    () => ({
      activityIndicator: palette.get('texts.button'),
      defaultIcon: palette.get('icons.default'),
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      optionText: {
        color: palette.get('texts.normal'),
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

  const selectedIndex = useMemo(() => options.findIndex(option => option.value === tempValue), [options, tempValue]);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setTempValue(value);
    setVisible(true);
  }, [value]);

  const onApply = useCallback(async () => {
    setPending(true);
    await onChange(tempValue);
    setPending(false);
    closeModal();
  }, [closeModal, onChange, tempValue]);

  const onSelect = useCallback(option => {
    setTempValue(option.value);
  }, []);

  return (
    <RadioPickerModalComponent
      {...props}
      closeModal={closeModal}
      onApply={onApply}
      onSelect={onSelect}
      openModal={openModal}
      options={options}
      pending={pending}
      selectedIndex={selectedIndex}
      theme={theme}
      visible={visible}
    />
  );
};

RadioPickerModal.defaultProps = {
  options: [],
};

RadioPickerModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  value: PropTypes.any,
};

export default RadioPickerModal;
