import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Modal from 'react-native-modal';
import isFunction from 'utils/is-function';

import styles from './styles';

const ActionSheetComponent = ({ onClose, options, theme, visible }) => {
  const [locale] = useLocale();

  const getActionButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.action, theme.actionButtonPressed] : [styles.action]),
    [theme],
  );

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  const renderAction = useCallback(
    ({ item: option }) => {
      const onPress = () => {
        onClose();
        if (isFunction(option.callback)) {
          setTimeout(option.callback, 500);
        }
      };
      return (
        <Pressable key={option.label} onPress={onPress} style={getActionButtonStyle}>
          <MaterialIcons
            color={option.color || theme.iconColor}
            name={option.icon}
            size={20}
            style={styles.actionIcon}
          />
          <Text style={[theme.actionText, option.color && { color: option.color }]}>{option.label}</Text>
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
      style={styles.modal}
      useNativeDriverForBackdrop={false}
    >
      <View style={[styles.innerModal, theme.innerModal]}>
        <FlatList
          bounces={false}
          data={options}
          keyExtractor={option => option.label}
          removeClippedSubviews
          renderItem={renderAction}
        />
        <Button onPress={onClose} style={getCancelButtonStyle}>
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  theme: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

export default ActionSheetComponent;
