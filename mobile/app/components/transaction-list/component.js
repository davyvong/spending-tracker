import { useScrollToTop } from '@react-navigation/native';
import ActionSheet from 'components/action-sheet';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import Transaction from 'models/transaction';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useRef } from 'react';
import { SectionList, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({
  actions,
  cards,
  categories,
  contentContainerStyle,
  ListStickyHeaderComponent,
  selectedTransaction,
  setSelectedTransaction,
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
        onLongPress={() => setSelectedTransaction(item)}
        transaction={item}
      />
    ),
    [categories, setSelectedTransaction],
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
    <Fragment>
      <View style={ScrollViewStyles.container}>
        {ListStickyHeaderComponent && <View style={ScrollViewStyles.header}>{ListStickyHeaderComponent}</View>}
        <SectionList
          {...props}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          initialNumToRender={10}
          keyExtractor={item => item.id}
          ref={ref}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          scrollEventThrottle={200}
          stickySectionHeadersEnabled={false}
        />
      </View>
      <ActionSheet
        onClose={() => setSelectedTransaction(null)}
        options={actions}
        visible={Boolean(selectedTransaction)}
      />
    </Fragment>
  );
};

TransactionListComponent.defaultProps = {
  actions: [],
};

TransactionListComponent.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  cards: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  contentContainerStyle: ViewPropTypes.style,
  ListStickyHeaderComponent: PropTypes.node,
  selectedTransaction: Transaction.propTypes,
  setSelectedTransaction: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
