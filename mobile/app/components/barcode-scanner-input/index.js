import TextInput from 'components/text-input';
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import BarcodeScannerComponent from './component';

const BarcodeScanner = ({ onChangeText, ...props }) => {
  const { palette } = useTheme();
  const [permissionStatus, setPermissionStatus] = useState(PermissionStatus.UNDETERMINED);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const theme = useMemo(
    () => ({
      defaultIcon: palette.get('icons.default'),
    }),
    [palette],
  );

  const renderComponent = useCallback(inputProps => <BarcodeScannerComponent {...inputProps} theme={theme} />, [theme]);

  const closeScanner = useCallback(() => {
    setIsScannerOpen(false);
  }, []);

  const openScanner = useCallback(async () => {
    if (permissionStatus !== PermissionStatus.GRANTED) {
      const permission = await BarCodeScanner.requestPermissionsAsync();
      setPermissionStatus(permission.status);
      if (permission === PermissionStatus.GRANTED) {
        setIsScannerOpen(true);
      }
    } else {
      setIsScannerOpen(true);
    }
  }, [permissionStatus]);

  const onBarcodeScanned = useCallback(
    barcode => {
      if (onChangeText) {
        onChangeText(barcode.data);
      }
      closeScanner();
    },
    [closeScanner, onChangeText],
  );

  useEffect(() => {
    (async () => {
      const permission = await BarCodeScanner.getPermissionsAsync();
      setPermissionStatus(permission.status);
    })();
  }, []);

  return (
    <TextInput
      {...props}
      closeScanner={closeScanner}
      component={renderComponent}
      isScannerOpen={isScannerOpen}
      onBarcodeScanned={onBarcodeScanned}
      onChangeText={onChangeText}
      openScanner={openScanner}
    />
  );
};

BarcodeScanner.propTypes = {
  onChangeText: PropTypes.func,
};

export default BarcodeScanner;
