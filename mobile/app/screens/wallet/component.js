import MonthPicker from 'components/month-picker';
import MonthlySummary from 'components/monthly-summary';
import ScrollView from 'components/scroll-view';
import Title from 'components/title';
import WalletCarousel from 'components/wallet-carousel';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { RefreshControl, View } from 'react-native';

import styles from './styles';

const WalletScreenComponent = ({
  cards,
  getCardsAndSummary,
  monthlySpending,
  pendingCards,
  pendingSummary,
  refreshing,
  selectedMonth,
  setSelectedCard,
  setSelectedMonth,
}) => {
  const [locale] = useLocale();

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl onRefresh={getCardsAndSummary} refreshing={refreshing} />}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.walletScreen.title)}</Title>}
      >
        {!pendingCards && cards.length > 0 && (
          <Fragment>
            <View style={styles.sectionBlock}>
              <WalletCarousel containerCustomStyle={styles.walletCarousel} data={cards} onChange={setSelectedCard} />
            </View>
            <View style={styles.sectionBlock}>
              <MonthPicker onPress={setSelectedMonth} value={selectedMonth} />
            </View>
            <View style={styles.sectionBlock}>
              <MonthlySummary pending={pendingSummary} spending={monthlySpending} />
            </View>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

WalletScreenComponent.propTypes = {
  cards: PropTypes.array.isRequired,
  getCardsAndSummary: PropTypes.func.isRequired,
  monthlySpending: PropTypes.shape({
    credit: PropTypes.number.isRequired,
    currencyCode: PropTypes.string,
    date: PropTypes.string.isRequired,
    debit: PropTypes.number.isRequired,
  }),

  pendingCards: PropTypes.bool.isRequired,
  pendingSummary: PropTypes.bool.isRequired,
  refreshing: PropTypes.bool.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default WalletScreenComponent;
