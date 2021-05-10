import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Spacer from 'components/spacer';
import Text from 'components/text';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const SettingsScreenComponent = ({
  closeLogoutDialog,
  logout,
  logoutDialog,
  openLogoutDialog,
  navigateToPassword,
  navigateToProfile,
  theme,
}) => {
  const [locale] = useLocale();

  const getLogoutButtonStyle = useCallback(
    ({ pressed }) => (pressed ? theme.logoutButtonPressed : theme.logoutButton),
    [theme],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        StickyHeaderComponent={
          <Fragment>
            <Title>{locale.t(routeOptions.settingsScreen.title)}</Title>
            <Spacer />
            <Button
              onPress={openLogoutDialog}
              style={getLogoutButtonStyle}
              title={locale.t('screens.settings.buttons.logout')}
            />
          </Fragment>
        }
      >
        <View style={styles.sectionHeader}>
          <Text style={theme.sectionHeaderText}>{locale.t('screens.settings.sections.account')}</Text>
        </View>
        <Pressable onPress={navigateToProfile} style={styles.ctaRow}>
          <View style={styles.ctaRowIcon}>
            <MaterialCommunityIcons color={theme.iconColor} name="account-box" size={28} />
          </View>
          <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.personal-information')}</Text>
        </Pressable>
        <Pressable onPress={navigateToPassword} style={styles.ctaRow}>
          <View style={styles.ctaRowIcon}>
            <MaterialCommunityIcons color={theme.iconColor} name="lock-reset" size={28} />
          </View>
          <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.change-password')}</Text>
        </Pressable>
      </ScrollView>
      <ActionDialog
        onClose={closeLogoutDialog}
        message={locale.t('screens.settings.messages.logout')}
        primaryAction={{
          color: theme.logoutButton.backgroundColor,
          label: locale.t('screens.settings.buttons.logout'),
          onPress: logout,
        }}
        visible={logoutDialog}
      />
    </View>
  );
};

SettingsScreenComponent.propTypes = {
  closeLogoutDialog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  logoutDialog: PropTypes.bool.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  navigateToPassword: PropTypes.func.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SettingsScreenComponent;
