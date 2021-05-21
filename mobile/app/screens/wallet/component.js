import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MonthPicker from 'components/month-picker';
import MonthlySummary from 'components/monthly-summary';
import ScrollView from 'components/scroll-view';
import Spacer from 'components/spacer';
import Text from 'components/text';
import Title from 'components/title';
import WalletCarousel from 'components/wallet-carousel';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';

import styles from './styles';

const WalletScreenComponent = ({
  cards,
  monthlySpending,
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
            <WalletCarousel containerCustomStyle={styles.walletCarousel} data={cards} onChange={setSelectedCard} />
            <View style={styles.sectionBlock}>
              <MonthPicker onPress={setSelectedMonth} value={selectedMonth} />
            </View>
            {monthlySpending && (
              <View style={styles.sectionBlock}>
                <MonthlySummary spending={monthlySpending} />
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
    currencyCode: PropTypes.string,
    date: PropTypes.string.isRequired,
    debit: PropTypes.number.isRequired,
  }),
  navigateToTransactions: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshMonthlySpending: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default WalletScreenComponent;
