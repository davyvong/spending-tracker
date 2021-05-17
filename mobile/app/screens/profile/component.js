import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import RadioPickerInput from 'components/radio-picker-input';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import TextInput from 'components/text-input';
import Title from 'components/title';
import { currencyOptions } from 'components/transaction-form/constants';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const ProfileScreenComponent = ({
  closeDiscardDialog,
  closeSaveDialog,
  discardDialog,
  errors,
  openSaveDialog,
  navigateBack,
  pending,
  saveDialog,
  saveProfile,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.ctaButton, theme.cancelButtonPressed] : [styles.ctaButton, theme.cancelButton]),
    [theme],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.profileScreen.title)}</Title>}
      >
        <TextInput
          editable={!pending}
          error={errors.firstName && locale.t(errors.firstName)}
          label={locale.t('screens.profile.labels.first-name')}
          onChangeText={updateValue('firstName')}
          value={values.firstName}
        />
        <TextInput
          editable={!pending}
          error={errors.lastName && locale.t(errors.lastName)}
          label={locale.t('screens.profile.labels.last-name')}
          onChangeText={updateValue('lastName')}
          value={values.lastName}
        />
        <TextInput
          editable={!pending}
          error={errors.email && locale.t(errors.email)}
          label={locale.t('screens.profile.labels.email')}
          onChangeText={updateValue('email')}
          value={values.email}
        />
        <RadioPickerInput
          editable={!pending}
          error={errors.preferredCurrency && locale.t(errors.preferredCurrency)}
          label={locale.t('screens.profile.labels.preferred-currency')}
          onChange={updateValue('preferredCurrency')}
          options={currencyOptions}
          value={values.preferredCurrency}
        />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
        <View style={styles.ctaRow}>
          <Button disabled={pending} onPress={navigateBack} style={getCancelButtonStyle}>
            <Text>{locale.t('screens.profile.buttons.cancel')}</Text>
          </Button>
          <Button
            disabled={pending}
            onPress={openSaveDialog}
            style={styles.ctaButton}
            title={pending ? '' : locale.t('screens.profile.buttons.save')}
          >
            <ActivityIndicator color={theme.activityIndicator} />
          </Button>
        </View>
      </ScrollView>
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.profile.messages.discard-changes')}
        primaryAction={{
          color: theme.discardButton.backgroundColor,
          label: locale.t('screens.profile.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.profile.messages.save-profile')}
        primaryAction={{
          label: locale.t('screens.profile.buttons.save'),
          onPress: saveProfile,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

ProfileScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  navigateBack: PropTypes.func.isRequired,
  openSaveDialog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  saveProfile: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default ProfileScreenComponent;
