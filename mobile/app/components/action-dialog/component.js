import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const ActionDialogComponent = ({
  children,
  hidePrimary,
  hideSecondary,
  onClose,
  onModalHide,
  onPressPrimary,
  onPressSecondary,
  message,
  primaryAction,
  secondaryAction,
  theme,
  visible,
}) => {
  const [locale] = useLocale();

  const getSecondaryButtonStyle = useCallback(
    ({ pressed }) =>
      pressed ? [styles.ctaButton, theme.secondaryButtonPressed] : [styles.ctaButton, theme.secondaryButton],
    [theme],
  );

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropTransitionOutTiming={0}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      style={styles.modal}
      useNativeDriverForBackdrop={false}
    >
      <View style={[styles.innerModal, theme.innerModal]}>
        <View style={styles.dialogContent}>
          {message ? <Text style={styles.messageText}>{message}</Text> : children}
        </View>
        <View style={styles.ctaRow}>
          {!hideSecondary && (
            <Button onPress={onPressSecondary} style={getSecondaryButtonStyle}>
              <Text>{secondaryAction.label || locale.t('components.action-dialog.buttons.cancel')}</Text>
            </Button>
          )}
          {!hidePrimary && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressPrimary}
              style={[
                styles.ctaButton,
                theme.primaryButton,
                primaryAction.color && { backgroundColor: primaryAction.color },
              ]}
            >
              <Text style={theme.primaryButtonText}>
                {primaryAction.label || locale.t('components.action-dialog.buttons.confirm')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

ActionDialogComponent.defaultProps = {
  hidePrimary: false,
  hideSecondary: false,
};

ActionDialogComponent.propTypes = {
  children: PropTypes.node,
  hidePrimary: PropTypes.bool,
  hideSecondary: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onModalHide: PropTypes.func.isRequired,
  onPressPrimary: PropTypes.func.isRequired,
  onPressSecondary: PropTypes.func.isRequired,
  message: PropTypes.string,
  primaryAction: PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.string,
  }),
  theme: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ActionDialogComponent;
