import NoData from 'assets/svg/no-data.svg';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Text as RNText, View } from 'react-native';

import styles from './styles';

const MonthlySummaryComponent = ({ pending, spending, theme }) => {
  const [locale] = useLocale();

  if (pending || !spending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!spending.credit && !spending.debit) {
    return (
      <View style={styles.container}>
        <NoData height={120} style={styles.noDataImage} width={120} />
        <Text style={styles.noDataText}>{locale.t('components.monthly-summary.messages.no-data')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.statisticRow}>
      <View style={[styles.statisticCard, theme.statisticCard]}>
        <Text style={theme.statisticLabel}>{locale.t('components.monthly-summary.labels.income')}</Text>
        <Text style={styles.statisticAmount}>
          {locale.toCurrency(spending.credit, { precision: 2, unit: '' })}{' '}
          <RNText style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currencyCode}</RNText>
        </Text>
      </View>
      <View style={[styles.statisticCard, theme.statisticCard]}>
        <Text style={theme.statisticLabel}>{locale.t('components.monthly-summary.labels.expenses')}</Text>
        <Text style={styles.statisticAmount}>
          {locale.toCurrency(spending.debit, { precision: 2, unit: '' })}{' '}
          <RNText style={[styles.statisticCurrency, theme.statisticCurrency]}>{spending.currencyCode}</RNText>
        </Text>
      </View>
    </View>
  );
};

MonthlySummaryComponent.propTypes = {
  pending: PropTypes.bool.isRequired,
  spending: PropTypes.shape({
    credit: PropTypes.number,
    currencyCode: PropTypes.string,
    date: PropTypes.string,
    debit: PropTypes.number,
  }),
  theme: PropTypes.object.isRequired,
};

export default MonthlySummaryComponent;
