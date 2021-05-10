import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { SectionList, View } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({
  activeRow,
  cards,
  categories,
  ListStickyHeaderComponent,
  onPressItem,
  scrollReachedTop,
  theme,
  ...props
}) => {
  const [locale] = useLocale();

  const headerStyle = useMemo(() => {
    const baseHeaderStyle = [ScrollViewStyles.headerContent, theme.headerContent];
    if (!scrollReachedTop) {
      return baseHeaderStyle.concat([ScrollViewStyles.headerShadow, theme.headerShadow]);
    }
    return baseHeaderStyle;
  }, [scrollReachedTop, theme]);

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
      {ListStickyHeaderComponent && (
        <View style={ScrollViewStyles.header}>
          <View style={headerStyle}>{ListStickyHeaderComponent}</View>
        </View>
      )}
      <SectionList
        {...props}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={10}
        keyExtractor={item => item.id}
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
  ListStickyHeaderComponent: PropTypes.node,
  onPressItem: PropTypes.func,
  scrollReachedTop: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
