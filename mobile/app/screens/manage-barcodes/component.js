import ActionSheet from 'components/action-sheet';
import BarcodeCard from 'components/barcode-card';
import Button from 'components/button';
import ScrollViewStyles from 'components/scroll-view/styles';
import Text from 'components/text';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Barcode from 'models/barcode';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import styles from './styles';

const ManageBarcodesScreenComponent = ({
  actionSheet,
  actionSheetOptions,
  barcodes,
  closeActionSheet,
  navigateToCreateBarcode,
  openActionSheet,
  refreshBarcodes,
  refreshing,
  selectedBarcode,
  setNavigationOptions,
  theme,
}) => {
  const [locale] = useLocale();

  const renderItem = useCallback(
    ({ index, item }) => (
      <View key={item.id} style={index > 0 && styles.card}>
        <BarcodeCard {...item} onLongPress={() => openActionSheet(item)} />
      </View>
    ),
    [theme],
  );

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={navigateToCreateBarcode} title={locale.t('screens.manage-barcodes.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, navigateToCreateBarcode, setNavigationOptions]);

  return (
    <View style={styles.container}>
      <View style={ScrollViewStyles.header}>
        <Title>{locale.t(routeOptions.manageBarcodesScreen.title)}</Title>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={barcodes}
        initialNumToRender={0}
        keyExtractor={item => item.id}
        maxToRenderPerBatch={1}
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshBarcodes}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        renderItem={renderItem}
        scrollEventThrottle={200}
      />
      <ActionSheet onClose={closeActionSheet} options={actionSheetOptions} visible={actionSheet}>
        {selectedBarcode && (
          <View style={styles.actionSheet}>
            <View style={styles.actionSheetRow}>
              <View style={styles.actionSheetColumn1}>
                <Text style={styles.actionSheetLargeText}>{selectedBarcode.name}</Text>
                <Text style={[styles.actionSheetSmallText, theme.actionSheetMutedText]}>{selectedBarcode.value}</Text>
              </View>
              <View style={styles.actionSheetColumn2}>
                <Text style={styles.actionSheetLargeText}>{selectedBarcode.getFormattedAmount(locale)}</Text>
                <Text style={[styles.actionSheetSmallText, theme.actionSheetMutedText]}>
                  {selectedBarcode.currency}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ActionSheet>
    </View>
  );
};

ManageBarcodesScreenComponent.defaultProps = {
  barcodes: [],
};

ManageBarcodesScreenComponent.propTypes = {
  actionSheet: PropTypes.bool.isRequired,
  actionSheetOptions: PropTypes.array,
  barcodes: PropTypes.arrayOf(Barcode.propTypes),
  closeActionSheet: PropTypes.func.isRequired,
  navigateToCreateBarcode: PropTypes.func.isRequired,
  openActionSheet: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshBarcodes: PropTypes.func.isRequired,
  selectedBarcode: Barcode.propTypes,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ManageBarcodesScreenComponent;
