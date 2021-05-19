import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const RadioPickerModalComponent = ({
  children,
  closeModal,
  onApply,
  onSelect,
  openModal,
  options,
  pending,
  selectedIndex,
  theme,
  visible,
  ...props
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  const renderOption = useCallback(
    ({ index, item: option = {} }) => {
      const active = index === selectedIndex;
      return (
        <Pressable key={option.value} onPress={() => onSelect(option)} style={styles.option}>
          <MaterialIcons
            color={theme.defaultIcon}
            name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
            style={styles.optionIcon}
          />
          <Text style={theme.optionText}>{option.label}</Text>
        </Pressable>
      );
    },
    [onSelect, selectedIndex, theme],
  );

  return (
    <Fragment>
      <Pressable onPress={openModal}>{children}</Pressable>
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={visible}
        onBackButtonPress={pending ? undefined : closeModal}
        onBackdropPress={pending ? undefined : closeModal}
        style={styles.modal}
        useNativeDriverForBackdrop={false}
        {...props}
      >
        <View style={[styles.innerModal, theme.innerModal]}>
          <FlatList
            bounces={false}
            data={options}
            keyExtractor={option => option.value}
            removeClippedSubviews
            renderItem={renderOption}
          />
          <View style={styles.buttonRow}>
            <Button disabled={pending} onPress={closeModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.radio-picker-input.buttons.cancel')}</Text>
            </Button>
            <Button
              disabled={pending}
              onPress={onApply}
              style={styles.button}
              title={pending ? '' : locale.t('components.radio-picker-input.buttons.apply')}
            >
              <ActivityIndicator color={theme.activityIndicator} />
            </Button>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

RadioPickerModalComponent.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  pending: PropTypes.bool.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  value: PropTypes.any,
  visible: PropTypes.bool.isRequired,
};

export default RadioPickerModalComponent;
