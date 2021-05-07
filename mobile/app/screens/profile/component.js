import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import Header from 'components/header';
import RadioPickerInput from 'components/radio-picker-input';
import Spacer from 'components/spacer';
import TextInput from 'components/text-input';
import Title from 'components/title';
import { currencyOptions } from 'components/transaction-form/constants';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

const ProfileScreenComponent = ({
  closeDiscardDialog,
  closeLogoutDialog,
  closeSaveDialog,
  discardDialog,
  logout,
  logoutDialog,
  navigateBack,
  openLogoutDialog,
  saveDialog,
  saveProfile,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getLogoutButtonStyle = useCallback(
    ({ pressed }) => (pressed ? theme.logoutButtonPressed : theme.logoutButton),
    [theme],
  );

  return (
    <View style={styles.container}>
      <Header>
        <Title>{locale.t(routeOptions.profileScreen.title)}</Title>
        <Spacer />
        <Button
          onPress={openLogoutDialog}
          style={getLogoutButtonStyle}
          title={locale.t('screens.profile.buttons.logout')}
        />
      </Header>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <TextInput
          label={locale.t('screens.profile.labels.first-name')}
          onChangeText={updateValue('firstName')}
          value={values.firstName}
        />
        <TextInput
          label={locale.t('screens.profile.labels.last-name')}
          onChangeText={updateValue('lastName')}
          value={values.lastName}
        />
        <TextInput
          label={locale.t('screens.profile.labels.email')}
          onChangeText={updateValue('email')}
          value={values.email}
        />
        <RadioPickerInput
          label={locale.t('screens.profile.labels.preferred-currency')}
          onChange={updateValue('preferredCurrency')}
          options={currencyOptions}
          value={values.preferredCurrency}
        />
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
        onClose={closeLogoutDialog}
        message={locale.t('screens.profile.messages.logout')}
        primaryAction={{
          color: theme.logoutButton.backgroundColor,
          label: locale.t('screens.profile.buttons.logout'),
          onPress: logout,
        }}
        visible={logoutDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.profile.messages.save-transaction')}
        primaryAction={{
          label: locale.t('screens.profile.buttons.save-changes'),
          onPress: saveProfile,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

ProfileScreenComponent.propTypes = {
  closeDiscardDialog: PropTypes.func.isRequired,
  closeLogoutDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  logoutDialog: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  openSaveDialog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  saveProfile: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default ProfileScreenComponent;
