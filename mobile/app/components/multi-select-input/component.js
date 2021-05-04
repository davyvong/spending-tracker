import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const MultiSelectSheet = ({ editable, name, onChange, options, theme, value, ...props }) => {
  const [locale] = useLocale();
  const [tempValue, setTempValue] = useState(value);
  const [visible, setVisible] = useState(false);

  const optionByValue = useMemo(
    () =>
      options.reduce((map, option) => {
        map[option.value] = option;
        map[option.value].selected = Boolean(tempValue) && String(tempValue).includes(option.value);
        return map;
      }, {}),
    [options, tempValue],
  );

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setTempValue(value);
    setVisible(true);
  }, [value]);

  const onSelect = useCallback(
    option => {
      let nextValue = tempValue || '';
      if (nextValue) {
        nextValue += ',';
      }
      nextValue += option.value;
      setTempValue(nextValue);
    },
    [options, tempValue],
  );

  const onDeselect = useCallback(
    option => {
      const split = tempValue.split(',');
      const index = split.findIndex(val => val === option.value);
      if (index > -1) {
        split.splice(index, 1);
        setTempValue(split.join(','));
      }
    },
    [options, tempValue],
  );

  const onApply = useCallback(() => {
    onChange(tempValue);
    closeModal();
  }, [onChange, tempValue]);

  const renderOption = useCallback(
    ({ item: option = {} }) => {
      const active = get(optionByValue, `['${option.value}'].selected`, false);
      const icon = active ? 'check-box' : 'check-box-outline-blank';
      const onPress = active ? () => onDeselect(option) : () => onSelect(option);
      return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.option}>
          <MaterialIcons color={theme.iconColor} name={icon} size={20} style={styles.optionIcon} />
          <Text style={theme.optionText}>{option.label}</Text>
        </TouchableOpacity>
      );
    },
    [options, tempValue],
  );

  const prettifiedValue = useMemo(() => {
    if (!value) {
      return '';
    }
    return String(value)
      .replace(/\s+/g, '')
      .split(',')
      .reduce((values, option) => {
        const label = get(optionByValue, `['${option}'].label`);
        if (label) {
          if (values) {
            values += ', ';
          }
          values += label;
        }
        return values;
      }, '');
  }, [options, value]);

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [],
  );

  return (
    <Fragment>
      <TouchableOpacity activeOpacity={1} disabled={!editable} onPress={openModal}>
        <TextInput {...props} editable={false} pointerEvents="none" value={prettifiedValue} />
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
              <Text>{locale.t('components.multi-select-input.buttons.cancel')}</Text>
            </Button>
            <Button
              onPress={onApply}
              style={styles.button}
              title={locale.t('components.multi-select-input.buttons.apply')}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

MultiSelectSheet.propTypes = {
  editable: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  theme: PropTypes.object.isRequired,
  value: PropTypes.any,
};

export default MultiSelectSheet;
