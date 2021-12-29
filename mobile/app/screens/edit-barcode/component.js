import ActionDialog from 'components/action-dialog';
import BarcodeForm from 'components/barcode-form';
import Button from 'components/button';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const EditBarcodeScreenComponent = ({
  closeDiscardDialog,
  closeErrorDialog,
  closeSaveDialog,
  discardDialog,
  errors,
  errorDialog,
  navigateBack,
  pending,
  saveBarcode,
  saveDialog,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={saveBarcode} title={pending ? '' : locale.t('screens.edit-barcode.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, saveBarcode, pending, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <BarcodeForm
        editable={!pending}
        errors={errors}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.editBarcodeScreen.title)}</Title>}
        updateValue={updateValue}
        values={values}
      />
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.edit-barcode.messages.discard-changes')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.edit-barcode.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
      <ActionDialog
        hideSecondary
        onClose={closeErrorDialog}
        message={locale.t('common.unknown-error')}
        primaryAction={{ onPress: closeErrorDialog }}
        visible={errorDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.edit-barcode.messages.save-card')}
        primaryAction={{
          label: locale.t('screens.edit-barcode.buttons.save'),
          onPress: saveBarcode,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

EditBarcodeScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeErrorDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  errorDialog: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  saveBarcode: PropTypes.func.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default EditBarcodeScreenComponent;
