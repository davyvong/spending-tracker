import Button from 'components/button';
import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import styles from './styles';

const CardTransactionListScreenComponent = ({
  card,
  navigateToCreateTransaction,
  onDeleteTransaction,
  onListEndReached,
  refreshing,
  refreshTransactions,
  setNavigationOptions,
  transactions,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={navigateToCreateTransaction} title={locale.t('screens.card-transaction-list.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, setNavigationOptions]);

  return (
    <View style={styles.container}>
      <TransactionList
        contentContainerStyle={styles.contentContainer}
        ListStickyHeaderComponent={<Title>{card?.name}</Title>}
        onDelete={onDeleteTransaction}
        onEndReached={onListEndReached}
        onRefresh={refreshTransactions}
        refreshing={refreshing}
        sections={transactions}
      />
    </View>
  );
};

CardTransactionListScreenComponent.defaultProps = {
  transactions: [],
};

CardTransactionListScreenComponent.propTypes = {
  card: Card.propTypes,
  navigateToCreateTransaction: PropTypes.func.isRequired,
  onDeleteTransaction: PropTypes.func.isRequired,
  onListEndReached: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshTransactions: PropTypes.func.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.arrayOf(Transaction.propTypes).isRequired,
      section: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CardTransactionListScreenComponent;
