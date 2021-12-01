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

const CreateCardScreenComponent = ({
  closeDiscardDialog,
  closeErrorDialog,
  createCard,
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
      <Button onPress={createCard} title={pending ? '' : locale.t('screens.create-card.buttons.save')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: renderHeaderRight });
  }, [locale, createCard, pending, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <ScrollView StickyHeaderComponent={<Title>{locale.t(routeOptions.createCardScreen.title)}</Title>}>
        <CardForm editable={!pending} errors={errors} updateValue={updateValue} values={values} />
        <ActionDialog
          onClose={closeDiscardDialog}
          message={locale.t('screens.create-card.messages.discard-changes')}
          primaryAction={{
            color: theme.deleteButton.backgroundColor,
            label: locale.t('screens.create-card.buttons.discard'),
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
      </ScrollView>
    </View>
  );
};

CreateCardScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeErrorDialog: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
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

export default CreateCardScreenComponent;
