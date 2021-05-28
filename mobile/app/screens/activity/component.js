import Button from 'components/button';
import Spacer from 'components/spacer';
import SpendingChart from 'components/spending-chart';
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
  getTransactions,
  getTransactionsFromStorage,
  navigateToCreateTransaction,
  refreshing,
  refreshTransactions,
  transactionIds,
  transactions,
}) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <TransactionList
        ListHeaderComponent={
          <View style={styles.spendingChart}>
            <SpendingChart data={dailySpending} />
          </View>
        }
        ListStickyHeaderComponent={
          <Fragment>
            <Title>{locale.t(routeOptions.activityScreen.title)}</Title>
            <Spacer />
            <Button onPress={navigateToCreateTransaction} title={locale.t('screens.activity.buttons.create')} />
          </Fragment>
        }
        onDelete={() => getTransactionsFromStorage(transactionIds)}
        onEndReached={() => {
          if (transactionIds.size < 200) {
            getTransactions(transactionIds.size);
          }
        }}
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
  getTransactions: PropTypes.func.isRequired,
  getTransactionsFromStorage: PropTypes.func.isRequired,
  navigateToCreateTransaction: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshTransactions: PropTypes.func.isRequired,
  transactionIds: PropTypes.instanceOf(Set).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ActivityScreenComponent;
