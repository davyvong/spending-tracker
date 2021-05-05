import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import isFunction from 'utils/is-function';

import ActionDialogComponent from './component';

const ActionDialog = ({ onClose, primaryAction, secondaryAction, ...props }) => {
  const { palette } = useTheme();

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
    onClose();
    if (isFunction(primaryAction.onPress)) {
      setTimeout(primaryAction.onPress, 500);
    }
  }, [onClose, primaryAction]);

  const onPressSecondary = useCallback(() => {
    onClose();
    if (isFunction(secondaryAction.onPress)) {
      setTimeout(secondaryAction.onPress, 500);
    }
  }, [onClose, secondaryAction]);

  return (
    <ActionDialogComponent
      {...props}
      onClose={onClose}
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
