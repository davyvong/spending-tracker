import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import TransactionModal from 'components/transaction-modal';
import Card from 'models/card';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const CardTransactionListScreenComponent = ({
  card,
  getTransactions,
  getTransactionsWithoutLoading,
  navigateToEditTransaction,
  pending,
  selectedTransaction,
  setSelectedTransaction,
  skip,
  transactions,
}) => (
  <View onMoveShouldSetResponderCapture={() => true} style={styles.container}>
    <TransactionList
      ListStickyHeaderComponent={<Title>{card?.name}</Title>}
      onEndReached={() => getTransactionsWithoutLoading(skip)}
      onPressItem={setSelectedTransaction}
      onRefresh={getTransactions}
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

CardTransactionListScreenComponent.defaultProps = {
  transactions: [],
};

CardTransactionListScreenComponent.propTypes = {
  card: Card.propTypes,
  getTransactions: PropTypes.func.isRequired,
  getTransactionsWithoutLoading: PropTypes.func.isRequired,
  navigateToEditTransaction: PropTypes.func.isRequired,
  pending: PropTypes.bool,
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

export default CardTransactionListScreenComponent;
