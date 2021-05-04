import Text from 'components/text';
import TransactionRow from 'components/transaction-row';
import useLocale from 'hooks/locale';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { SectionList, View } from 'react-native';

import styles from './styles';

const TransactionListComponent = ({ activeRow, categories, onPressItem, theme, ...props }) => {
  const [locale] = useLocale();

  const renderItem = useCallback(
    ({ item }) => (
      <TransactionRow
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
              : moment(section, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
          </Text>
        </View>
      );
    },
    [locale, theme],
  );

  return (
    <SectionList
      {...props}
      initialNumToRender={10}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
};

TransactionListComponent.defaultProps = {
  onPressItem: () => {},
};

TransactionListComponent.propTypes = {
  activeRow: PropTypes.string,
  categories: PropTypes.object.isRequired,
  onPressItem: PropTypes.func,
  theme: PropTypes.object.isRequired,
};

export default TransactionListComponent;
