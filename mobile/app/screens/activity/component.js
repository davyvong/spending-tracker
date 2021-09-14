import Button from 'components/button';
import Spacer from 'components/spacer';
import DailySpendingChart from 'components/daily-spending-chart';
import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { View } from 'react-native';

import styles from './styles';

const ActivityScreenComponent = ({
  dailySpending,
  onDeleteTransaction,
  onListEndReached,
  navigateToCreateTransaction,
  refreshing,
  refreshTransactions,
  transactions,
}) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <TransactionList
        ListHeaderComponent={
          <View style={styles.spendingChart}>
            <DailySpendingChart data={dailySpending} />
          </View>
        }
        ListStickyHeaderComponent={
          <Fragment>
            <Title>{locale.t(routeOptions.activityScreen.title)}</Title>
            <Spacer />
            <Button onPress={navigateToCreateTransaction} title={locale.t('screens.activity.buttons.create')} />
          </Fragment>
        }
        onDelete={onDeleteTransaction}
        onEndReached={onListEndReached}
        onRefresh={refreshTransactions}
        refreshing={refreshing}
        sections={transactions}
      />
    </View>
  );
};

ActivityScreenComponent.defaultProps = {
  transactions: [],
};

ActivityScreenComponent.propTypes = {
  dailySpending: PropTypes.array.isRequired,
  onDeleteTransaction: PropTypes.func.isRequired,
  onListEndReached: PropTypes.func.isRequired,
  navigateToCreateTransaction: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ActivityScreenComponent;
