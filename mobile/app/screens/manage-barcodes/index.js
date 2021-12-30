import { getBarcodeFormat } from 'constants/barcodes';
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
  const [actionSheet, setActionSheet] = useState(false);
  const [barcodes, setBarcodes] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBarcodeIndex, setSelectedBarcodeIndex] = useState(0);

  const selectedBarcode = useMemo(() => barcodes[selectedBarcodeIndex], [barcodes, selectedBarcodeIndex]);

  const theme = useMemo(
    () => ({
      actionSheetMutedText: {
        color: palette.get('texts.muted'),
      },
      deleteButton: {
        backgroundColor: palette.get('backgrounds.alternate-button'),
      },
      refreshControl: palette.get('refresh-control'),
    }),
    [palette],
  );

  const getBarcodesFromAPI = useCallback(api.getBarcodes, []);

  const getBarcodesFromStorage = useCallback(
    async barcodeIds => {
      let barcodeList = Array.from(barcodeIds);
      for (let i = 0; i < barcodeList.length; i += 1) {
        const storageKey = storage.getItemKey('barcode', barcodeList[i]);
        const cachedBarcode = await storage.getItem(storageKey);
        if (cachedBarcode) {
          barcodeList[i] = new Barcode(cachedBarcode);
        }
      }
      barcodeList = barcodeList.filter(barcode => barcode instanceof Barcode);
      setBarcodes(barcodeList);
      if (selectedBarcodeIndex > barcodeList.length - 1) {
        setSelectedBarcodeIndex(barcodeList.length - 1);
      }
    },
    [selectedBarcodeIndex],
  );

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

  const navigateToEditBarcode = useCallback(() => {
    navigation.navigate(routeOptions.editBarcodeScreen.name, { barcode: selectedBarcode });
  }, [navigation, selectedBarcode]);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialog(false);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialog(true);
  }, []);

  const deleteBarcode = useCallback(async () => {
    const barcodeId = await api.deleteBarcode(selectedBarcode.id).catch();
    const storageKey = storage.getItemKey('barcodes');
    const cachedBarcodeIds = await storage.getItem(storageKey);
    return getBarcodesFromStorage(cachedBarcodeIds.filter(id => id !== barcodeId));
  }, [api.deleteCard, getBarcodesFromStorage, selectedBarcode]);

  const actionSheetOptions = useMemo(
    () => [
      {
        callback: navigateToEditBarcode,
        icon: 'edit',
        label: locale.t('screens.manage-barcodes.actions.edit'),
      },
      {
        callback: openDeleteDialog,
        color: palette.get('texts.error'),
        icon: 'delete',
        label: locale.t('screens.manage-barcodes.actions.delete'),
      },
    ],
    [locale, navigateToEditBarcode, openDeleteDialog, palette],
  );

  const closeActionSheet = useCallback(() => {
    setActionSheet(false);
  }, []);

  const openActionSheet = useCallback(() => {
    setActionSheet(true);
  }, []);

  const updateBarcodeFormat = useCallback(
    async format => {
      if (selectedBarcode && getBarcodeFormat(format)) {
        await api.updateBarcode(selectedBarcode.id, { format });
        await getBarcodes();
      }
    },
    [api.updateBarcode, getBarcodes, selectedBarcode],
  );

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
      actionSheet={actionSheet}
      actionSheetOptions={actionSheetOptions}
      barcodes={barcodes}
      closeActionSheet={closeActionSheet}
      closeDeleteDialog={closeDeleteDialog}
      deleteBarcode={deleteBarcode}
      deleteDialog={deleteDialog}
      navigateToCreateBarcode={navigateToCreateBarcode}
      openActionSheet={openActionSheet}
      refreshing={refreshing}
      refreshBarcodes={refreshBarcodes}
      selectedBarcode={selectedBarcode}
      selectedBarcodeIndex={selectedBarcodeIndex}
      setNavigationOptions={navigation.setOptions}
      setSelectedBarcode={setSelectedBarcodeIndex}
      theme={theme}
      updateBarcodeFormat={updateBarcodeFormat}
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
