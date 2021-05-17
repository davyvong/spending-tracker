import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

import TransactionRowComponent from './component';

const TransactionRow = props => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      transactionRowAmountPositive: {
        color: palette.get('texts.positive'),
      },
      transactionRowIcon: {
        backgroundColor: palette.get('backgrounds.icon'),
        color: palette.get('texts.primary'),
      },
      transactionRowMutedText: {
        color: palette.get('texts.muted'),
      },
    }),
    [palette],
  );

  return <TransactionRowComponent {...props} theme={theme} />;
};

export default TransactionRow;
