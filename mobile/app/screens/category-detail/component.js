import Button from 'components/button';
import Title from 'components/title';
import TransactionList from 'components/transaction-list';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import styles from './styles';

const CategoryDetailScreenComponent = ({
  category,
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
      <Button onPress={navigateToCreateTransaction} title={locale.t('screens.category-detail.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, navigateToCreateTransaction, setNavigationOptions]);

  return (
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
};

CategoryDetailScreenComponent.defaultProps = {
  transactions: [],
};

CategoryDetailScreenComponent.propTypes = {
  category: Category.propTypes,
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

export default CategoryDetailScreenComponent;
