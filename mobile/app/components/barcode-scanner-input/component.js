import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from 'components/button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Modal, Pressable, SafeAreaView, StyleSheet, TextInput } from 'react-native';

import styles from './styles';

const BarcodeScannerComponent = ({ closeScanner, isScannerOpen, onBarcodeScanned, openScanner, theme, ...props }) => {
  const [locale] = useLocale();

  return (
    <Fragment>
      <TextInput {...props} />
      <Pressable onPress={openScanner} style={styles.scannerIcon}>
        <MaterialCommunityIcons color={theme.defaultIcon} name="barcode-scan" size={20} />
      </Pressable>
      <Modal animationType="slide" onRequestClose={closeScanner} visible={isScannerOpen}>
        <SafeAreaView style={styles.modalContent}>
          <BarCodeScanner onBarCodeScanned={onBarcodeScanned} style={StyleSheet.absoluteFillObject} />
          <Button
            onPress={closeScanner}
            style={styles.closeButton}
            title={locale.t('components.barcode-scanner-input.buttons.close')}
          />
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

BarcodeScannerComponent.propTypes = {
  closeScanner: PropTypes.func.isRequired,
  isScannerOpen: PropTypes.bool.isRequired,
  onBarcodeScanned: PropTypes.func.isRequired,
  openScanner: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default BarcodeScannerComponent;
