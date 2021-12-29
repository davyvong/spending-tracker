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

const CreateBarcodeScreenComponent = ({
  closeDiscardDialog,
  closeErrorDialog,
  createBarcode,
  discardDialog,
  errors,
  errorDialog,
  navigateBack,
  pending,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={createBarcode} title={pending ? '' : locale.t('screens.create-barcode.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, createBarcode, pending, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <BarcodeForm
        editable={!pending}
        errors={errors}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.createBarcodeScreen.title)}</Title>}
        updateValue={updateValue}
        values={values}
      />
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.create-barcode.messages.discard-changes')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.create-barcode.buttons.discard'),
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
    </View>
  );
};

CreateBarcodeScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeErrorDialog: PropTypes.func.isRequired,
  createBarcode: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  errorDialog: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default CreateBarcodeScreenComponent;
