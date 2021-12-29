import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import CardForm from 'components/card-form';
import ScrollView from 'components/scroll-view';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const EditCardScreenComponent = ({
  closeDiscardDialog,
  closeErrorDialog,
  closeSaveDialog,
  discardDialog,
  errors,
  errorDialog,
  navigateBack,
  pending,
  saveCard,
  saveDialog,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={saveCard} title={pending ? '' : locale.t('screens.create-card.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, pending, saveCard, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <ScrollView StickyHeaderComponent={<Title>{locale.t(routeOptions.createCardScreen.title)}</Title>}>
        <CardForm editable={!pending} errors={errors} updateValue={updateValue} values={values} />
      </ScrollView>
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.edit-card.messages.discard-changes')}
        primaryAction={{
          color: theme.deleteButton.backgroundColor,
          label: locale.t('screens.edit-card.buttons.discard'),
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
        message={locale.t('screens.edit-card.messages.save-card')}
        primaryAction={{
          label: locale.t('screens.edit-card.buttons.save'),
          onPress: saveCard,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

EditCardScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeErrorDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  errorDialog: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  saveCard: PropTypes.func.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default EditCardScreenComponent;
