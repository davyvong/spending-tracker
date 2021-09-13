import useTheme from 'hooks/theme';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import CardSpendingDetailScreenComponent from './component';

const CardSpendingDetailScreen = ({ route, ...props }) => {
  const { card, endDate, startDate } = route.params;

  console.log({ endDate, startDate });

  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      chartTooltip: {
        fill: palette.get('backgrounds.chart-tooltip'),
      },
      chartTooltipText: {
        fill: palette.get('texts.chart-tooltip'),
      },
    }),
    [theme],
  );

  return <CardSpendingDetailScreenComponent {...props} card={card} theme={theme} />;
};

CardSpendingDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      card: Card.propTypes.isRequired,
      endDate: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
    }),
  }),
};

export default CardSpendingDetailScreen;
