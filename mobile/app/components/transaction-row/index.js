import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TransactionRowComponent from './component';

const TransactionRow = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      transactionRow: {
        backgroundColor: palette.get('rowBackground'),
      },
      transactionRowAmountPositive: {
        color: palette.get('positiveText'),
      },
      transactionRowIcon: {
        backgroundColor: palette.get('iconBackground'),
        color: palette.get('primaryText'),
      },
      transactionRowMutedText: {
        color: palette.get('mutedText'),
      },
    }),
    [palette],
  );

  return <TransactionRowComponent {...props} theme={theme} />;
};

export default TransactionRow;
