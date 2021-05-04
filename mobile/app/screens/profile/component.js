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
import React, { Fragment, useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

const ProfileScreenComponent = ({ account, closeLogoutDialog, logout, logoutDialog, openLogoutDialog, theme }) => {
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
        {account.id && (
          <Fragment>
            <View style={styles.fieldRow}>
              <View style={styles.fieldColumn}>
                <TextInput
                  editable={false}
                  label={locale.t('screens.profile.labels.firstName')}
                  onChangeText={() => {}}
                  value={account.firstName}
                />
              </View>
              <View style={styles.fieldColumn}>
                <TextInput
                  editable={false}
                  label={locale.t('screens.profile.labels.lastName')}
                  onChangeText={() => {}}
                  value={account.lastName}
                />
              </View>
            </View>
            <TextInput
              editable={false}
              label={locale.t('screens.profile.labels.email')}
              onChangeText={() => {}}
              value={account.email}
            />
            <RadioPickerInput
              editable={false}
              label={locale.t('screens.profile.labels.preferredCurrency')}
              onChange={() => {}}
              options={currencyOptions}
              value={account.preferredCurrency}
            />
          </Fragment>
        )}
      </ScrollView>
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
    </View>
  );
};

ProfileScreenComponent.propTypes = {
  account: PropTypes.object,
  closeLogoutDialog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  logoutDialog: PropTypes.bool.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ProfileScreenComponent;
