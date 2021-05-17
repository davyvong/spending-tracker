import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import isFunction from 'utils/is-function';

import ActionDialogComponent from './component';

const ActionDialog = ({ onClose, primaryAction, secondaryAction, ...props }) => {
  const { palette } = useTheme();
  const [callback, setCallback] = useState();

  const theme = useMemo(
    () => ({
      innerModal: {
        backgroundColor: palette.get('modalBackground'),
      },
      primaryCTAButton: {
        backgroundColor: palette.get('buttonBackground'),
      },
      primaryCTAButtonText: {
        color: palette.get('buttonText'),
      },
      secondaryCTAButton: {
        backgroundColor: palette.get('cancelBackground'),
      },
      secondaryCTAButtonPressed: {
        backgroundColor: palette.get('pressedBackground'),
      },
    }),
    [palette],
  );

  const onPressPrimary = useCallback(() => {
    if (isFunction(primaryAction.onPress)) {
      setCallback(() => primaryAction.onPress);
    }
    onClose();
  }, [onClose, primaryAction]);

  const onPressSecondary = useCallback(() => {
    if (isFunction(secondaryAction.onPress)) {
      setCallback(() => secondaryAction.onPress);
    }
    onClose();
  }, [onClose, secondaryAction]);

  const onModalHide = useCallback(() => {
    if (isFunction(callback)) {
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
