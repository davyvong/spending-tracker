import { routeOptions } from 'constants/routes';
import useAPI from 'hooks/api';
import useLocale from 'hooks/locale';
import useStorage from 'hooks/storage';
import useTheme from 'hooks/theme';
import Barcode from 'models/barcode';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ManageBarcodesScreenComponent from './component';

const ManageBarcodesScreen = ({ navigation, ...props }) => {
  const api = useAPI();
  const [locale] = useLocale();
  const storage = useStorage();
  const { palette } = useTheme();
  const [barcodes, setBarcodes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState();

  const theme = useMemo(
    () => ({
      actionSheetMutedText: {
        color: palette.get('texts.muted'),
      },
      refreshControl: palette.get('refresh-control'),
    }),
    [palette],
  );

  const getBarcodesFromAPI = useCallback(api.getBarcodes, []);

  const getBarcodesFromStorage = useCallback(async barcodeIds => {
    let barcodeList = Array.from(barcodeIds);
    for (let i = 0; i < barcodeList.length; i += 1) {
      const storageKey = storage.getItemKey('barcode', barcodeList[i]);
      const cachedBarcode = await storage.getItem(storageKey);
      if (cachedBarcode) {
        barcodeList[i] = new Barcode(cachedBarcode);
      }
    }
    setBarcodes(barcodeList.filter(barcode => barcode instanceof Barcode));
  }, []);

  const getBarcodes = useCallback(
    () =>
      getBarcodesFromAPI()
        .then(getBarcodesFromStorage)
        .catch(async () => {
          const storageKey = storage.getItemKey('barcodes');
          const cachedBarcodeIds = await storage.getItem(storageKey);
          return getBarcodesFromStorage([...cachedBarcodeIds]);
        }),
    [getBarcodesFromAPI, getBarcodesFromStorage],
  );

  const refreshBarcodes = useCallback(async () => {
    setRefreshing(true);
    await getBarcodes();
    setRefreshing(false);
  }, []);

  const navigateToCreateBarcode = useCallback(() => {
    navigation.navigate(routeOptions.createBarcodeScreen.name, { barcode: {} });
  }, [navigation]);

  const actionSheetOptions = useMemo(
    () => [
      {
        callback: () => {},
        icon: 'edit',
        label: locale.t('screens.manage-barcodes.actions.edit'),
      },
      {
        callback: () => {},
        color: palette.get('texts.error'),
        icon: 'delete',
        label: locale.t('screens.manage-barcodes.actions.delete'),
      },
    ],
    [locale, palette],
  );

  const closeActionSheet = useCallback(() => {
    setSelectedBarcode();
  }, []);

  const openActionSheet = useCallback(barcode => {
    setSelectedBarcode(barcode);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBarcodes();
    });
    return () => {
      unsubscribe();
    };
  }, [getBarcodes, navigation]);

  return (
    <ManageBarcodesScreenComponent
      {...props}
      actionSheet={Boolean(selectedBarcode)}
      actionSheetOptions={actionSheetOptions}
      barcodes={barcodes}
      closeActionSheet={closeActionSheet}
      navigateToCreateBarcode={navigateToCreateBarcode}
      openActionSheet={openActionSheet}
      refreshing={refreshing}
      refreshBarcodes={refreshBarcodes}
      selectedBarcode={selectedBarcode}
      setNavigationOptions={navigation.setOptions}
      theme={theme}
    />
  );
};

ManageBarcodesScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }),
};

export default ManageBarcodesScreen;
