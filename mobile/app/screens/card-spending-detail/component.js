import CategoryRow from 'components/category-row';
import CategorySpendingChart from 'components/category-spending-chart';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { View } from 'react-native';

import styles from './styles';

const CardSpendingDetailScreenComponent = ({ card, categorySpending, theme }) => {
  const [locale] = useLocale();

  const renderSpending = useCallback(
    spending => <CategoryRow {...spending} currency={card.currency} key={spending.categoryId} />,
    [card],
  );

  return (
    <View style={styles.container}>
      <ScrollView StickyHeaderComponent={<Title>{card?.name}</Title>}>
        {categorySpending.length > 0 && (
          <Fragment>
            <View style={styles.categorySpendingContainer}>
              <CategorySpendingChart data={categorySpending} />
            </View>
            <View style={styles.categorySectionHeader}>
              <Text style={theme.categorySectionHeaderText}>
                {locale.t('screens.card-spending-detail.sections.categories')}
              </Text>
            </View>
            <View style={styles.categoryListContainer}>{categorySpending.map(renderSpending)}</View>
          </Fragment>
        )}
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
  theme: PropTypes.object.isRequired,
};

export default CardSpendingDetailScreenComponent;
