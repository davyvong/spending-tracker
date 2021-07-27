import Text from 'components/text';
import { getCurrency } from 'constants/currencies';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const MonthlySummaryComponent = ({ pending, spending, theme }) => {
  const [locale] = useLocale();

  const currency = useMemo(() => getCurrency(spending?.currencyCode), [spending]);

  if (!spending) {
    return null;
  }

  if (pending) {
    return (
      <View style={[styles.container, styles.pendingContainer]}>
        <ActivityIndicator color={theme.activityIndicator} />
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.statisticRow]}>
      <View style={[styles.statisticCard, theme.statisticCard]}>
        <Text style={theme.statisticLabel}>
          {locale.t(`components.monthly-summary.labels.${currency?.cryptocurrency ? 'deposits' : 'credit'}`)}
        </Text>
        <Text style={[styles.statisticAmount, currency?.cryptocurrency && styles.statisticAmountSmall]}>
          {locale.toCurrency(spending.credit, { precision: currency?.precision, unit: '' })}{' '}
          <Text style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currencyCode}</Text>
        </Text>
      </View>
      <View style={[styles.statisticCard, theme.statisticCard]}>
        <Text style={theme.statisticLabel}>
          {locale.t(`components.monthly-summary.labels.${currency?.cryptocurrency ? 'withdrawals' : 'debit'}`)}
        </Text>
        <Text style={[styles.statisticAmount, currency?.cryptocurrency && styles.statisticAmountSmall]}>
          {locale.toCurrency(spending.debit, { precision: currency?.precision, unit: '' })}{' '}
          <Text style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currencyCode}</Text>
        </Text>
      </View>
    </View>
  );
};

MonthlySummaryComponent.defaultProps = {
  pending: false,
};

MonthlySummaryComponent.propTypes = {
  pending: PropTypes.bool,
  spending: PropTypes.shape({
    credit: PropTypes.number,
    currencyCode: PropTypes.string,
    date: PropTypes.string,
    debit: PropTypes.number,
  }),
  theme: PropTypes.object.isRequired,
};

export default MonthlySummaryComponent;
