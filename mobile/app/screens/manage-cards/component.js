import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import ScrollViewStyles from 'components/scroll-view/styles';
import Title from 'components/title';
import WalletCard from 'components/wallet-card';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, View } from 'react-native';

import styles from './styles';

const ManageCardsScreenComponent = ({
  cards,
  navigateToCreateCard,
  refreshCards,
  refreshing,
  setNavigationOptions,
  theme,
  updateCardVisibility,
  visibleLoading,
}) => {
  const [locale] = useLocale();

  const renderItem = useCallback(
    ({ index, item }) => (
      <View key={item.id} style={index > 0 && styles.card}>
        <WalletCard {...item} />
        <Pressable
          disabled={visibleLoading === index}
          onPress={() => updateCardVisibility(item.id, !item.visible, index)}
          style={styles.cardVisibility}
        >
          {visibleLoading === index ? (
            <ActivityIndicator color={theme.activityIndicator} />
          ) : (
            <MaterialIcons color={theme.defaultIcon} name={item.visible ? 'visibility' : 'visibility-off'} size={24} />
          )}
        </Pressable>
      </View>
    ),
    [visibleLoading],
  );

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={navigateToCreateCard} title={locale.t('screens.manage-cards.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, navigateToCreateCard, setNavigationOptions]);

  return (
    <View style={styles.container}>
      <View style={ScrollViewStyles.header}>
        <Title>{locale.t(routeOptions.manageCardsScreen.title)}</Title>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={cards}
        initialNumToRender={1}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={1}
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshCards}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        removeClippedSubviews={cards.length > 10}
        renderItem={renderItem}
        scrollEventThrottle={200}
      />
    </View>
  );
};

ManageCardsScreenComponent.defaultProps = {
  cards: [],
};

ManageCardsScreenComponent.propTypes = {
  cards: PropTypes.arrayOf(Card.propTypes),
  navigateToCreateCard: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshCards: PropTypes.func.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateCardVisibility: PropTypes.func.isRequired,
  visibleLoading: PropTypes.number.isRequired,
};

export default ManageCardsScreenComponent;
