import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const TransactionRowComponent = ({ category, theme, transaction, ...props }) => {
  const [locale] = useLocale();
  const transactionAmount = useMemo(() => {
    const amount = locale.toCurrency(transaction.amount, { unit: '' });
    if (transaction.amount === 0) {
      return amount;
    }
    return `${transaction.sign}${amount}`;
  }, [locale, transaction]);

  return (
    <Pressable {...props} style={[styles.transactionRow, theme.transactionRow]}>
      <View style={[styles.transactionRowColumn, styles.transactionRowColumn1]}>
        <View style={[styles.transactionRowIcon, theme.transactionRowIcon]}>
          <MaterialCommunityIcons
            color={theme.transactionRowIcon.color}
            name={category.icon || 'credit-card-outline'}
            size={28}
          />
        </View>
      </View>
      <View style={[styles.transactionRowColumn, styles.transactionRowColumn2]}>
        <Text numberOfLines={1} style={styles.transactionRowVendor}>
          {transaction.vendor}
        </Text>
        <Text style={[styles.transactionRowCategory, theme.transactionRowMutedText]}>{category.name}</Text>
      </View>
      <View style={[styles.transactionRowColumn, styles.transactionRowColumn3]}>
        <Text style={[styles.transactionRowAmount, transaction.isCredit && theme.transactionRowAmountPositive]}>
          {transactionAmount}
        </Text>
        <Text style={[styles.transactionRowCurrency, theme.transactionRowMutedText]}>{transaction.currencyCode}</Text>
      </View>
    </Pressable>
  );
};

TransactionRowComponent.propTypes = {
  category: Category.propTypes,
  theme: PropTypes.object,
  transaction: Transaction.propTypes,
};

export default TransactionRowComponent;
