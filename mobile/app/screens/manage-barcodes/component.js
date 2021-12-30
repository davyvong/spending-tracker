import ActionDialog from 'components/action-dialog';
import ActionSheet from 'components/action-sheet';
import BarcodeCard from 'components/barcode-card';
import Button from 'components/button';
import CardCarousel from 'components/card-carousel';
import RadioPickerInput from 'components/radio-picker-input';
import ReadOnlyTextInput from 'components/read-only-text-input';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import Title from 'components/title';
import { barcodeFormatOptions } from 'constants/barcodes';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Barcode from 'models/barcode';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';

import styles from './styles';

const ManageBarcodesScreenComponent = ({
  actionSheet,
  actionSheetOptions,
  barcodes,
  closeActionSheet,
  closeDeleteDialog,
  deleteBarcode,
  deleteDialog,
  navigateToCreateBarcode,
  openActionSheet,
  refreshBarcodes,
  refreshing,
  selectedBarcode,
  selectedBarcodeIndex,
  setNavigationOptions,
  setSelectedBarcode,
  theme,
  updateBarcodeFormat,
}) => {
  const [locale] = useLocale();

  const renderBarcodeCard = useCallback(
    itemProps => <BarcodeCard {...itemProps} onPress={openActionSheet} />,
    [openActionSheet],
  );

  const renderAttribute = useCallback(
    attribute => <ReadOnlyTextInput key={attribute.name} label={attribute.name} value={attribute.value} />,
    [],
  );

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={navigateToCreateBarcode} title={locale.t('screens.manage-barcodes.buttons.create')} />
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, navigateToCreateBarcode, setNavigationOptions]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            color={[theme.refreshControl]}
            onRefresh={refreshBarcodes}
            refreshing={refreshing}
            tintColor={theme.refreshControl}
          />
        }
        StickyHeaderComponent={<Title>{locale.t(routeOptions.manageBarcodesScreen.title)}</Title>}
      >
        <CardCarousel
          containerCustomStyle={styles.cardCarousel}
          currentIndex={selectedBarcodeIndex}
          data={barcodes}
          onChange={(barcode, index) => setSelectedBarcode(index)}
          ItemComponent={renderBarcodeCard}
        />
        {selectedBarcode && (
          <Fragment>
            <ReadOnlyTextInput
              label={locale.t('screens.manage-barcodes.labels.barcode')}
              value={selectedBarcode.value}
            />
            <RadioPickerInput
              label={locale.t('screens.manage-barcodes.labels.format')}
              onChange={updateBarcodeFormat}
              options={barcodeFormatOptions}
              value={selectedBarcode.format}
            />
            {selectedBarcode.attributes.map(renderAttribute)}
          </Fragment>
        )}
      </ScrollView>
      <ActionSheet onClose={closeActionSheet} options={actionSheetOptions} visible={actionSheet}>
        {selectedBarcode && (
          <View style={styles.actionSheet}>
            <Text style={styles.actionSheetLargeText}>{selectedBarcode.name}</Text>
            <Text style={[styles.actionSheetSmallText, theme.actionSheetMutedText]}>{selectedBarcode.value}</Text>
          </View>
        )}
      </ActionSheet>
      <ActionDialog
        onClose={closeDeleteDialog}
        message={locale.t('screens.manage-barcodes.messages.delete-barcode')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.manage-barcodes.buttons.delete'),
          onPress: deleteBarcode,
        }}
        visible={deleteDialog}
      />
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
  closeDeleteDialog: PropTypes.func.isRequired,
  deleteBarcode: PropTypes.func.isRequired,
  deleteDialog: PropTypes.bool.isRequired,
  navigateToCreateBarcode: PropTypes.func.isRequired,
  openActionSheet: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refreshBarcodes: PropTypes.func.isRequired,
  selectedBarcode: Barcode.propTypes,
  selectedBarcodeIndex: PropTypes.number.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  setSelectedBarcode: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateBarcodeFormat: PropTypes.func.isRequired,
};

export default ManageBarcodesScreenComponent;
