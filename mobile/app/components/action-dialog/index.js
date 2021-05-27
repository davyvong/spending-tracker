import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

import ActionDialogComponent from './component';

const ActionDialog = ({ onClose, primaryAction, secondaryAction, ...props }) => {
  const { palette } = useTheme();
  const [callback, setCallback] = useState();

  const theme = useMemo(
    () => ({
      innerModal: {
        backgroundColor: palette.get('backgrounds.modal'),
      },
      primaryButton: {
        backgroundColor: palette.get('backgrounds.primary-button'),
      },
      primaryButtonText: {
        color: palette.get('texts.button'),
      },
      secondaryButton: {
        backgroundColor: palette.get('backgrounds.secondary-button'),
      },
      secondaryButtonPressed: {
        backgroundColor: palette.get('backgrounds.secondary-button-pressed'),
      },
    }),
    [palette],
  );

  const onPressPrimary = useCallback(() => {
    if (primaryAction.onPress instanceof Function) {
      setCallback(() => primaryAction.onPress);
    }
    onClose();
  }, [onClose, primaryAction]);

  const onPressSecondary = useCallback(() => {
    if (secondaryAction.onPress instanceof Function) {
      setCallback(() => secondaryAction.onPress);
    }
    onClose();
  }, [onClose, secondaryAction]);

  const onModalHide = useCallback(() => {
    if (callback instanceof Function) {
      callback();
      setCallback();
    }
  }, [callback]);

  return (
    <ActionDialogComponent
      {...props}
      onClose={onClose}
      onModalHide={onModalHide}
      onPressPrimary={onPressPrimary}
      onPressSecondary={onPressSecondary}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      theme={theme}
    />
  );
};

ActionDialog.defaultProps = {
  primaryAction: {},
  secondaryAction: {},
};

ActionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  primaryAction: PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.string,
    onPress: PropTypes.func,
  }),
};

export default ActionDialog;
