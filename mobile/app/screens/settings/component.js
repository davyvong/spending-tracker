import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import RadioPickerModal from 'components/radio-picker-modal';
import ScrollView from 'components/scroll-view';
import Spacer from 'components/spacer';
import Text from 'components/text';
import Title from 'components/title';
import { currencyOptions } from 'constants/currencies';
import { colorSchemeOptions } from 'constants/color-schemes';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import Account from 'models/account';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const SettingsScreenComponent = ({
  account,
  closeLogoutDialog,
  logout,
  logoutDialog,
  openLogoutDialog,
  navigateToPassword,
  navigateToProfile,
  theme,
  themeName,
  updateAccount,
  updateTheme,
}) => {
  const [locale] = useLocale();

  const getLogoutButtonStyle = useCallback(
    ({ pressed }) => (pressed ? theme.logoutButtonPressed : theme.logoutButton),
    [theme],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
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
          <MaterialCommunityIcons color={theme.activeIcon} name="account-box" size={28} style={styles.ctaRowLeftIcon} />
          <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.personal-information')}</Text>
          <Spacer />
          <MaterialIcons
            color={theme.defaultIcon}
            name="keyboard-arrow-right"
            size={20}
            style={styles.ctaRowRightIcon}
          />
        </Pressable>
        <Pressable onPress={navigateToPassword} style={styles.ctaRow}>
          <MaterialCommunityIcons color={theme.activeIcon} name="lock-reset" size={28} style={styles.ctaRowLeftIcon} />
          <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.change-password')}</Text>
          <Spacer />
          <MaterialIcons
            color={theme.defaultIcon}
            name="keyboard-arrow-right"
            size={20}
            style={styles.ctaRowRightIcon}
          />
        </Pressable>
        <View style={styles.sectionHeader}>
          <Text style={theme.sectionHeaderText}>{locale.t('screens.settings.sections.preferences')}</Text>
        </View>
        <RadioPickerModal
          onChange={currency => updateAccount({ currencyCode: currency })}
          options={currencyOptions}
          value={account?.currencyCode}
        >
          <View style={styles.ctaRow}>
            <MaterialCommunityIcons
              color={theme.activeIcon}
              name="currency-usd"
              size={28}
              style={styles.ctaRowLeftIcon}
            />
            <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.default-currency')}</Text>
            <Spacer />
            <Text style={[styles.ctaRowText, theme.selectedValueText]}>{account?.currencyCode}</Text>
            <MaterialIcons color={theme.defaultIcon} name="expand-more" size={20} style={styles.ctaRowRightIcon} />
          </View>
        </RadioPickerModal>
        <RadioPickerModal onChange={updateTheme} options={colorSchemeOptions} value={account?.theme}>
          <View style={styles.ctaRow}>
            <MaterialCommunityIcons
              color={theme.activeIcon}
              name="theme-light-dark"
              size={28}
              style={styles.ctaRowLeftIcon}
            />
            <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.theme')}</Text>
            <Spacer />
            <Text style={[styles.ctaRowText, theme.selectedValueText]}>{themeName}</Text>
            <MaterialIcons color={theme.defaultIcon} name="expand-more" size={20} style={styles.ctaRowRightIcon} />
          </View>
        </RadioPickerModal>
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
  account: Account.propTypes,
  closeLogoutDialog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  logoutDialog: PropTypes.bool.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  navigateToPassword: PropTypes.func.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
  updateAccount: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
};

export default SettingsScreenComponent;
