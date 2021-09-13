import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const CategoryRowComponent = ({ amount, category, currency, theme, transactionCount, ...props }) => {
  const [locale] = useLocale();

  const formattedAmount = useMemo(() => {
    const transaction = new Transaction({ amount, currency });
    return transaction.getFormattedAmount(locale);
  }, [amount, locale]);

  return (
    <Pressable {...props} style={styles.categoryRow}>
      <View style={[styles.categoryRowColumn, styles.categoryRowColumn1]}>
        <View style={[styles.categoryRowIcon, theme.categoryRowIcon]}>
          <MaterialCommunityIcons color={theme.categoryRowIcon.color} name={category?.icon} size={28} />
        </View>
      </View>
      <View style={[styles.categoryRowColumn, styles.categoryRowColumn2]}>
        <Text numberOfLines={1} style={styles.categoryRowVendor}>
          {category?.name}
        </Text>
        <Text style={[styles.categoryRowCategory, theme.categoryRowMutedText]}>
          {locale.t('components.category-row.transaction-count', { count: transactionCount })}
        </Text>
      </View>
      <View style={[styles.categoryRowColumn, styles.categoryRowColumn3]}>
        <Text style={[styles.categoryRowAmount, amount > 0 && theme.categoryRowAmountPositive]}>{formattedAmount}</Text>
        <Text style={[styles.categoryRowCurrency, theme.categoryRowMutedText]}>{currency}</Text>
      </View>
    </Pressable>
  );
};

CategoryRowComponent.propTypes = {
  amount: PropTypes.number.isRequired,
  category: Category.propTypes,
  currency: PropTypes.string.isRequired,
  theme: PropTypes.object,
  transactionCount: PropTypes.number.isRequired,
};

export default CategoryRowComponent;
