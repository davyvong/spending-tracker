import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import hexToRGB from 'utils/hex-to-rgb';

import TransactionHiddenRowComponent from './component';

const TransactionHiddenRow = props => {
  const [pendingDelete, setPendingDelete] = useState(false);
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      iconColor: palette.get('buttonText'),
      deleteButton: {
        backgroundColor: palette.get('errorBackground'),
      },
      pressedDeleteButton: {
        backgroundColor: hexToRGB(palette.get('errorBackground'), 0.7),
      },
    }),
    [palette],
  );

  const onDeleteItem = useCallback(
    async transaction => {
      setPendingDelete(true);
      await props.onDeleteItem(transaction);
      setPendingDelete(false);
    },
    [props.onDeleteItem],
  );

  return (
    <TransactionHiddenRowComponent {...props} onDeleteItem={onDeleteItem} pendingDelete={pendingDelete} theme={theme} />
  );
};

TransactionHiddenRow.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
};

export default TransactionHiddenRow;
