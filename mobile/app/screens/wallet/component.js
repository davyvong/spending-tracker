import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CardCarousel from 'components/card-carousel';
import MonthPicker from 'components/month-picker';
import MonthlySpending from 'components/monthly-spending';
import ScrollView from 'components/scroll-view';
import Spacer from 'components/spacer';
import Text from 'components/text';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import styles from './styles';

const WalletScreenComponent = ({
  cards,
  monthlySpending,
  navigateToSummary,
  navigateToTransactions,
  refreshing,
  refreshMonthlySpending,
  selectedMonth,
  setSelectedCard,
  setSelectedMonth,
  theme,
}) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshMonthlySpending}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        StickyHeaderComponent={<Title>{locale.t(routeOptions.walletScreen.title)}</Title>}
      >
        {cards.length > 0 && (
          <Fragment>
            <CardCarousel containerCustomStyle={styles.cardCarousel} data={cards} onChange={setSelectedCard} />
            <View style={styles.sectionBlock}>
              <MonthPicker onPress={setSelectedMonth} value={selectedMonth} />
            </View>
            {monthlySpending && (
              <View style={styles.sectionBlock}>
                <MonthlySpending spending={monthlySpending} />
              </View>
            )}
            <Pressable onPress={navigateToTransactions} style={styles.ctaRow}>
              <MaterialCommunityIcons
                color={theme.actionIcon}
                name="credit-card-outline"
                size={28}
                style={styles.ctaRowLeftIcon}
              />
              <Text style={styles.ctaRowText}>{locale.t('screens.wallet.actions.transactions')}</Text>
              <Spacer />
              <MaterialIcons
                color={theme.defaultIcon}
                name="keyboard-arrow-right"
                size={20}
                style={styles.ctaRowRightIcon}
              />
            </Pressable>
            <Pressable onPress={navigateToSummary} style={styles.ctaRow}>
              <MaterialCommunityIcons
                color={theme.actionIcon}
                name="chart-arc"
                size={28}
                style={styles.ctaRowLeftIcon}
              />
              <Text style={styles.ctaRowText}>{locale.t('screens.wallet.actions.spending')}</Text>
              <Spacer />
              <MaterialIcons
                color={theme.defaultIcon}
                name="keyboard-arrow-right"
                size={20}
                style={styles.ctaRowRightIcon}
              />
            </Pressable>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

WalletScreenComponent.propTypes = {
  cards: PropTypes.array.isRequired,
  monthlySpending: PropTypes.shape({
    credit: PropTypes.number.isRequired,
    currency: PropTypes.string,
    date: PropTypes.string.isRequired,
    debit: PropTypes.number.isRequired,
  }),
  navigateToSummary: PropTypes.func.isRequired,
  navigateToTransactions: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshMonthlySpending: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default WalletScreenComponent;
