import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import Card from 'models/card';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const CardTransactionListScreenComponent = ({
  card,
  getTransactions,
  refreshing,
  refreshTransactions,
  skip,
  transactions,
}) => (
  <View style={styles.container}>
    <TransactionList
      contentContainerStyle={styles.contentContainer}
      ListStickyHeaderComponent={<Title>{card?.name}</Title>}
      onEndReached={() => getTransactions(skip)}
      onRefresh={refreshTransactions}
      refreshing={refreshing}
      sections={transactions}
    />
  </View>
);

CardTransactionListScreenComponent.defaultProps = {
  transactions: [],
};

CardTransactionListScreenComponent.propTypes = {
  card: Card.propTypes,
  getTransactions: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshTransactions: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CardTransactionListScreenComponent;
