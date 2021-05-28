import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const CategoryDetailScreenComponent = ({
  category,
  onDeleteTransaction,
  onListEndReached,
  refreshing,
  refreshTransactions,
  transactions,
}) => (
  <View style={styles.container}>
    <TransactionList
      contentContainerStyle={styles.contentContainer}
      ListStickyHeaderComponent={<Title>{category?.name}</Title>}
      onDelete={onDeleteTransaction}
      onEndReached={onListEndReached}
      onRefresh={refreshTransactions}
      refreshing={refreshing}
      sections={transactions}
    />
  </View>
);

CategoryDetailScreenComponent.defaultProps = {
  transactions: [],
};

CategoryDetailScreenComponent.propTypes = {
  category: Category.propTypes,
  onDeleteTransaction: PropTypes.func.isRequired,
  onListEndReached: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CategoryDetailScreenComponent;
