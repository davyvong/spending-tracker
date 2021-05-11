import { useScrollToTop } from '@react-navigation/native';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { SectionList, View } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({
  activeRow,
  cards,
  categories,
  ListHeaderComponent,
  ListStickyHeaderComponent,
  onPressItem,
  theme,
  ...props
}) => {
  const [locale] = useLocale();
  const ref = useRef();

  useScrollToTop(ref);

  const renderItem = useCallback(
    ({ item }) => (
      <TransactionRow
        card={cards[item.cardId]}
        category={categories[item.categoryId]}
        key={item.id}
        onPress={() => onPressItem(item)}
        transaction={item}
      />
    ),
    [activeRow, categories, onPressItem],
  );
  const renderSectionHeader = useCallback(
    ({ section: { section } }) => {
      if (!section) {
        return null;
      }
      return (
        <View style={styles.sectionHeader}>
          <Text style={theme.sectionHeaderText}>
            {section === 'PENDING'
              ? locale.t('components.transaction-list.sections.pending')
              : moment(section, 'YYYY-MM-DD').format('MMMM D, YYYY')}
          </Text>
        </View>
      );
    },
    [locale, theme],
  );

  return (
    <View style={ScrollViewStyles.container}>
      {ListStickyHeaderComponent && <View style={ScrollViewStyles.header}>{ListStickyHeaderComponent}</View>}
      <SectionList
        {...props}
        contentContainerStyle={!ListHeaderComponent && styles.contentContainer}
        initialNumToRender={10}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ref={ref}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        scrollEventThrottle={200}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

TransactionListComponent.defaultProps = {
  onPressItem: () => {},
};

TransactionListComponent.propTypes = {
  activeRow: PropTypes.string,
  cards: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  ListHeaderComponent: PropTypes.node,
  ListStickyHeaderComponent: PropTypes.node,
  onPressItem: PropTypes.func,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
