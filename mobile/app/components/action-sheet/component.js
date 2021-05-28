import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const ActionSheetComponent = ({ onClose, onModalHide, options, setCallback, theme, visible }) => {
  const [locale] = useLocale();

  const getActionButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.actionButton, theme.actionButtonPressed] : [styles.actionButton]),
    [theme],
  );

  const getCloseButtonStyle = useCallback(
    ({ pressed }) =>
      pressed ? [styles.closeButton, theme.closeButtonPressed] : [styles.closeButton, theme.closeButton],
    [theme],
  );

  const renderAction = useCallback(
    ({ item: option }) => {
      const onPress = () => {
        setCallback(() => option.callback);
        onClose();
      };
      return (
        <Pressable key={option.label} onPress={onPress} style={getActionButtonStyle}>
          <MaterialIcons
            color={option.color || theme.actionButtonIcon}
            name={option.icon}
            size={20}
            style={styles.actionButtonIcon}
          />
          <Text style={[theme.actionButtonText, option.color && { color: option.color }]}>{option.label}</Text>
        </Pressable>
      );
    },
    [getActionButtonStyle, onClose, theme],
  );

  return (
    <Modal
      backdropTransitionOutTiming={0}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      style={styles.modal}
      useNativeDriverForBackdrop={false}
    >
      <View style={[styles.innerModal, theme.innerModal]}>
        <FlatList
          bounces={false}
          data={options}
          keyExtractor={option => option.value}
          removeClippedSubviews
          renderItem={renderAction}
        />
        <Button onPress={onClose} style={getCloseButtonStyle}>
          <Text>{locale.t('components.action-sheet.buttons.close')}</Text>
        </Button>
      </View>
    </Modal>
  );
};

ActionSheetComponent.defaultProps = {
  onClose: () => {},
  options: [],
  visible: false,
};

ActionSheetComponent.propTypes = {
  onClose: PropTypes.func,
  onModalHide: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  setCallback: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

export default ActionSheetComponent;
