import { MaterialIcons } from '@expo/vector-icons';
import ActionDialog from 'components/action-dialog';
import ActionSheet from 'components/action-sheet';
import Button from 'components/button';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import Title from 'components/title';
import WalletCard from 'components/wallet-card';
import { getCardType } from 'constants/cards';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Card from 'models/card';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

import styles from './styles';

const ManageCardsScreenComponent = ({
  actionSheet,
  actionSheetOptions,
  cards,
  closeActionSheet,
  closeDeleteDialog,
  deleteDialog,
  deleteCard,
  navigateToCreateCard,
  openActionSheet,
  refreshCards,
  refreshing,
  selectedCard,
  setNavigationOptions,
  theme,
}) => {
  const [locale] = useLocale();

  const renderItem = useCallback(
    ({ index, item }) => (
      <View key={item.id} style={index > 0 && styles.card}>
        <WalletCard {...item} />
        <View style={styles.cardVisibility}>
          <MaterialIcons color={theme.defaultIcon} name={item.visible ? 'visibility' : 'visibility-off'} size={24} />
        </View>
        <Pressable onPress={() => openActionSheet(item)} style={styles.cardMenuButton}>
          <MaterialIcons color={theme.defaultIcon} name="more-vert" size={24} />
        </Pressable>
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
      <View style={ScrollViewStyles.header}>
        <Title>{locale.t(routeOptions.manageCardsScreen.title)}</Title>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={cards}
        initialNumToRender={0}
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
        removeClippedSubviews
        renderItem={renderItem}
        scrollEventThrottle={200}
      />
      <ActionSheet onClose={closeActionSheet} options={actionSheetOptions} visible={actionSheet}>
        {selectedCard && (
          <View style={styles.actionSheet}>
            <Text style={styles.actionSheetLargeText}>
              {selectedCard.company} {selectedCard.name}
            </Text>
            <Text style={[styles.actionSheetSmallText, theme.actionSheetMutedText]}>
              {getCardType(selectedCard.type).name}
            </Text>
          </View>
        )}
      </ActionSheet>
      <ActionDialog
        onClose={closeDeleteDialog}
        message={locale.t('screens.manage-cards.messages.delete-card')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.manage-cards.buttons.delete'),
          onPress: deleteCard,
        }}
        visible={deleteDialog}
      />
    </View>
  );
};

ManageCardsScreenComponent.defaultProps = {
  cards: [],
};

ManageCardsScreenComponent.propTypes = {
  actionSheet: PropTypes.bool.isRequired,
  actionSheetOptions: PropTypes.array.isRequired,
  cards: PropTypes.arrayOf(Card.propTypes),
  closeActionSheet: PropTypes.func.isRequired,
  closeDeleteDialog: PropTypes.func.isRequired,
  deleteDialog: PropTypes.bool.isRequired,
  deleteCard: PropTypes.func.isRequired,
  navigateToCreateCard: PropTypes.func.isRequired,
  openActionSheet: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshCards: PropTypes.func.isRequired,
  selectedCard: Card.propTypes,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ManageCardsScreenComponent;
