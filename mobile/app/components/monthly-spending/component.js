import Text from 'components/text';
import { getCurrency } from 'constants/currencies';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const MonthlySpendingComponent = ({ pending, spending, theme }) => {
  const [locale] = useLocale();

  const currency = useMemo(() => getCurrency(spending?.currency), [spending]);

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
        <Text style={theme.statisticLabel}>{locale.t('components.monthly-spending.labels.credit')}</Text>
        <Text style={styles.statisticAmount}>
          {locale.toCurrency(spending.credit, { precision: currency?.precision, unit: '' })}{' '}
          <Text style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currency}</Text>
        </Text>
      </View>
      <View style={[styles.statisticCard, theme.statisticCard]}>
        <Text style={theme.statisticLabel}>{locale.t('components.monthly-spending.labels.debit')}</Text>
        <Text style={styles.statisticAmount}>
          {locale.toCurrency(spending.debit, { precision: currency?.precision, unit: '' })}{' '}
          <Text style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currency}</Text>
        </Text>
      </View>
    </View>
  );
};

MonthlySpendingComponent.defaultProps = {
  pending: false,
};

MonthlySpendingComponent.propTypes = {
  pending: PropTypes.bool,
  spending: PropTypes.shape({
    credit: PropTypes.number,
    currency: PropTypes.string,
    date: PropTypes.string,
    debit: PropTypes.number,
  }),
  theme: PropTypes.object.isRequired,
};

export default MonthlySpendingComponent;
