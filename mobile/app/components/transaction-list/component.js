import { useScrollToTop } from '@react-navigation/native';
import ActionDialog from 'components/action-dialog';
import ActionSheet from 'components/action-sheet';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useRef } from 'react';
import { RefreshControl, SectionList, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({
  actionSheet,
  actionSheetOptions,
  cards,
  categories,
  closeDeleteDialog,
  contentContainerStyle,
  deleteDialog,
  deleteTransaction,
  ListStickyHeaderComponent,
  onRefresh,
  refreshing,
  setActionSheet,
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
        onLongPress={() => {
          setSelectedTransaction(item);
          setActionSheet(true);
        }}
        transaction={item}
      />
    ),
    [categories],
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
          refreshControl={
            <RefreshControl
              color={[theme.refreshControl]}
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={theme.refreshControl}
            />
          }
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          scrollEventThrottle={200}
          stickySectionHeadersEnabled={false}
        />
      </View>
      <ActionSheet onClose={() => setActionSheet(false)} options={actionSheetOptions} visible={actionSheet} />
      <ActionDialog
        onClose={closeDeleteDialog}
        message={locale.t('components.transaction-list.messages.delete-transaction')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('components.transaction-list.buttons.delete'),
          onPress: deleteTransaction,
        }}
        visible={deleteDialog}
      />
    </Fragment>
  );
};

TransactionListComponent.defaultProps = {
  actions: [],
};

TransactionListComponent.propTypes = {
  actionSheet: PropTypes.bool.isRequired,
  actionSheetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  cards: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  closeDeleteDialog: PropTypes.func.isRequired,
  contentContainerStyle: ViewPropTypes.style,
  deleteDialog: PropTypes.bool.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  ListStickyHeaderComponent: PropTypes.node,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  setActionSheet: PropTypes.func.isRequired,
  setSelectedTransaction: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
