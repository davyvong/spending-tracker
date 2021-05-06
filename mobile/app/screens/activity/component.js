import Button from 'components/button';
import Header from 'components/header';
import Spacer from 'components/spacer';
import SpendingChart from 'components/spending-chart';
import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import TransactionModal from 'components/transaction-modal';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const ActivityScreenComponent = ({
  dailySpending,
  getSpendingAndTransactions,
  getTransactionsWithoutLoading,
  navigateToCreateTransaction,
  navigateToEditTransaction,
  pending,
  selectedTransaction,
  setSelectedTransaction,
  skip,
  transactions,
}) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <Header>
        <Title>{locale.t(routeOptions.activityScreen.title)}</Title>
        <Spacer />
        <Button onPress={navigateToCreateTransaction} title={locale.t('screens.activity.buttons.create')} />
      </Header>
      <TransactionList
        ListHeaderComponent={
          <View style={styles.sectionBlock}>
            <SpendingChart data={dailySpending} />
          </View>
        }
        onEndReached={() => getTransactionsWithoutLoading(skip)}
        onPressItem={setSelectedTransaction}
        onRefresh={getSpendingAndTransactions}
        refreshing={pending}
        sections={transactions}
      />
      <TransactionModal
        onClose={() => setSelectedTransaction(null)}
        onEdit={navigateToEditTransaction}
        transaction={selectedTransaction}
      />
    </View>
  );
};

ActivityScreenComponent.defaultProps = {
  transactions: [],
};

ActivityScreenComponent.propTypes = {
  dailySpending: PropTypes.array.isRequired,
  getSpendingAndTransactions: PropTypes.func.isRequired,
  getTransactionsWithoutLoading: PropTypes.func.isRequired,
  navigateToCreateTransaction: PropTypes.func.isRequired,
  navigateToEditTransaction: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  selectedTransaction: Transaction.propTypes,
  setSelectedTransaction: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ActivityScreenComponent;
