import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const RadioPickerSheet = ({ editable, name, onChange, options, theme, value, ...props }) => {
  const [locale] = useLocale();
  const [tempValue, setTempValue] = useState(value);
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setTempValue(value);
    setVisible(true);
  }, [value]);

  const onSelect = option => {
    setTempValue(option.value);
  };

  const onApply = useCallback(() => {
    onChange(tempValue);
    closeModal();
  }, [closeModal, onChange, tempValue]);

  const tempSelected = useMemo(() => options.findIndex(option => option.value === tempValue), [options, tempValue]);

  const selected = useMemo(() => options.findIndex(option => option.value === value), [options, value]);

  const renderOption = useCallback(
    ({ index, item: option = {} }) => {
      const active = index === tempSelected;
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={`${name}.${option.value}`}
          onPress={() => onSelect(option)}
          style={styles.option}
        >
          <MaterialIcons
            color={theme.iconColor}
            name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
            style={styles.optionIcon}
          />
          <Text style={theme.optionText}>{option.label}</Text>
        </TouchableOpacity>
      );
    },
    [name, tempSelected, theme],
  );

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  return (
    <Fragment>
      <TouchableOpacity activeOpacity={1} disabled={!editable} onPress={openModal}>
        <TextInput
          {...props}
          editable={false}
          pointerEvents="none"
          value={selected > -1 ? String(options[selected].label) : ''}
        />
        <MaterialIcons color={theme.iconColor} name="expand-more" size={20} style={styles.expandIcon} />
      </TouchableOpacity>
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={visible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={styles.modal}
        useNativeDriverForBackdrop={false}
      >
        <View style={[styles.innerModal, theme.innerModal]}>
          <FlatList
            bounces={false}
            data={options}
            keyExtractor={option => `${name}.${option.value}`}
            removeClippedSubviews
            renderItem={renderOption}
          />
          <View style={styles.buttonRow}>
            <Button onPress={closeModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.radio-picker-input.buttons.cancel')}</Text>
            </Button>
            <Button
              onPress={onApply}
              style={styles.button}
              title={locale.t('components.radio-picker-input.buttons.apply')}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

RadioPickerSheet.defaultProps = {
  options: [],
};

RadioPickerSheet.propTypes = {
  editable: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  theme: PropTypes.object.isRequired,
  value: PropTypes.any,
};

export default RadioPickerSheet;
