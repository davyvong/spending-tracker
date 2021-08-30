import { useScrollToTop } from '@react-navigation/native';
import ActionDialog from 'components/action-dialog';
import ActionSheet from 'components/action-sheet';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import Transaction from 'models/transaction';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useRef } from 'react';
import { RefreshControl, SectionList, View, ViewPropTypes } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({
  actionSheet,
  actionSheetOptions,
  closeDeleteDialog,
  contentContainerStyle,
  deleteDialog,
  deleteTransaction,
  ListStickyHeaderComponent,
  onRefresh,
  refreshing,
  setActionSheet,
  selectedCard,
  selectedTransaction,
  selectTransaction,
  theme,
  ...props
}) => {
  const [locale] = useLocale();
  const ref = useRef();

  useScrollToTop(ref);

  const renderItem = useCallback(
    ({ item }) => (
      <TransactionRow
        delayLongPress={250}
        key={item.id}
        onLongPress={() => selectTransaction(item)}
        transaction={item}
      />
    ),
    [selectTransaction],
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
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          maxToRenderPerBatch={5}
          ref={ref}
          refreshControl={
            <RefreshControl
              color={[theme.refreshControl]}
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={theme.refreshControl}
            />
          }
          removeClippedSubviews
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          scrollEventThrottle={200}
          stickySectionHeadersEnabled={false}
          windowSize={7}
          {...props}
        />
      </View>
      <ActionSheet onClose={() => setActionSheet(false)} options={actionSheetOptions} visible={actionSheet}>
        {selectedTransaction && (
          <View style={styles.actionSheetTransaction}>
            <View style={styles.actionSheetTransactionRow}>
              <View style={styles.actionSheetTransactionColumn1}>
                <Text style={styles.actionSheetTransactionLargeText}>{selectedTransaction.vendor}</Text>
                {selectedCard && (
                  <Text style={[styles.actionSheetTransactionSmallText, theme.actionSheetTransactionMutedText]}>
                    {selectedCard.name}
                  </Text>
                )}
              </View>
              <View style={styles.actionSheetTransactionColumn2}>
                <Text
                  style={[
                    styles.actionSheetTransactionLargeText,
                    selectedTransaction.isCredit && theme.actionSheetTransactionAmountPositive,
                  ]}
                >
                  {selectedTransaction.getFormattedAmount(locale)}
                </Text>
                <Text style={[styles.actionSheetTransactionSmallText, theme.actionSheetTransactionMutedText]}>
                  {selectedTransaction.currency}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ActionSheet>
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
  closeDeleteDialog: PropTypes.func.isRequired,
  contentContainerStyle: ViewPropTypes.style,
  deleteDialog: PropTypes.bool.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  ListStickyHeaderComponent: PropTypes.node,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  selectedCard: Card.propTypes,
  selectedTransaction: Transaction.propTypes,
  selectTransaction: PropTypes.func.isRequired,
  setActionSheet: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
