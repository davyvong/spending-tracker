import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Title from 'components/title';
import WalletCard from 'components/wallet-card';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';

import styles from './styles';

const SettingsScreenComponent = ({
  cards,
  navigateToCreateCard,
  refreshCards,
  refreshing,
  setNavigationOptions,
  theme,
}) => {
  const [locale] = useLocale();

  const renderCard = useCallback(
    (card, index) => (
      <View key={card.id} style={index > 0 && styles.card}>
        <WalletCard {...card} />
      </View>
    ),
    [],
  );

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={navigateToCreateCard} title={locale.t('screens.manage-cards.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, navigateToCreateCard, setNavigationOptions]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshCards}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        StickyHeaderComponent={<Title>{locale.t(routeOptions.manageCardsScreen.title)}</Title>}
      >
        {cards.map(renderCard)}
      </ScrollView>
    </View>
  );
};

SettingsScreenComponent.defaultProps = {
  cards: [],
};

SettingsScreenComponent.propTypes = {
  cards: PropTypes.arrayOf(Card.propTypes),
  navigateToCreateCard: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshCards: PropTypes.func.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SettingsScreenComponent;
