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

const ActionSheetComponent = ({ actions, onClose, theme, visible }) => {
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
    ({ item: action }) => {
      const onPress = () => {
        onClose();
        if (isFunction(action.callback)) {
          setTimeout(action.callback, 500);
        }
      };
      return (
        <Pressable key={action.label} onPress={onPress} style={getActionButtonStyle}>
          <MaterialIcons
            color={action.color || theme.iconColor}
            name={action.icon}
            size={20}
            style={styles.actionIcon}
          />
          <Text style={[theme.actionText, action.color && { color: action.color }]}>{action.label}</Text>
        </Pressable>
      );
    },
    [getActionButtonStyle],
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
          data={actions}
          keyExtractor={option => option.label}
          removeClippedSubviews
          renderItem={renderAction}
        />
        <Button onPress={onClose} style={getCancelButtonStyle}>
          <Text>{locale.t('components.action-sheet.buttons.cancel')}</Text>
        </Button>
      </View>
    </Modal>
  );
};

ActionSheetComponent.defaultProps = {
  actions: [],
  onClose: () => {},
  visible: false,
};

ActionSheetComponent.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onClose: PropTypes.func,
  theme: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

export default ActionSheetComponent;
