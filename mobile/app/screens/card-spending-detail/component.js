import CategoryRow from 'components/category-row';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { RefreshControl, View } from 'react-native';

import styles from './styles';

const CardSpendingDetailScreenComponent = ({ card, categorySpending, refreshCategorySpending, refreshing, theme }) => {
  const [locale] = useLocale();

  const renderSpending = useCallback(
    spending => <CategoryRow {...spending} currency={card.currency} key={spending.categoryId} />,
    [card],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshCategorySpending}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        StickyHeaderComponent={<Title>{card?.name}</Title>}
      >
        <View style={styles.categorySectionHeader}>
          <Text style={theme.categorySectionHeaderText}>
            {locale.t('screens.card-spending-detail.sections.categories')}
          </Text>
        </View>
        <View style={styles.categoryListContainer}>{categorySpending.map(renderSpending)}</View>
      </ScrollView>
    </View>
  );
};

CardSpendingDetailScreenComponent.propTypes = {
  card: Card.propTypes,
  categorySpending: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      categoryId: PropTypes.string,
      transactionCount: PropTypes.number,
      x: PropTypes.string,
      y: PropTypes.number,
    }),
  ),
  refreshCategorySpending: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CardSpendingDetailScreenComponent;
