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
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const SettingsScreenComponent = ({
  closeLogoutDialog,
  colorScheme,
  logout,
  logoutDialog,
  openLogoutDialog,
  navigateToPassword,
  navigateToProfile,
  preferredCurrency,
  setColorScheme,
  theme,
  updateAccount,
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
        </Pressable>
        <Pressable onPress={navigateToPassword} style={styles.ctaRow}>
          <MaterialCommunityIcons color={theme.activeIcon} name="lock-reset" size={28} style={styles.ctaRowLeftIcon} />
          <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.change-password')}</Text>
        </Pressable>
        <RadioPickerModal
          onChange={currency => updateAccount({ preferredCurrency: currency })}
          options={currencyOptions}
          value={preferredCurrency}
        >
          <View style={styles.ctaRow}>
            <MaterialCommunityIcons
              color={theme.activeIcon}
              name="currency-usd"
              size={28}
              style={styles.ctaRowLeftIcon}
            />
            <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.preferred-currency')}</Text>
            <Spacer />
            <Text style={[styles.ctaRowText, theme.selectedValueText]}>{preferredCurrency}</Text>
            <MaterialIcons color={theme.defaultIcon} name="expand-more" size={20} style={styles.ctaRowRightIcon} />
          </View>
        </RadioPickerModal>
        <RadioPickerModal onChange={setColorScheme} options={colorSchemeOptions} value={colorScheme.id}>
          <View style={styles.ctaRow}>
            <MaterialCommunityIcons
              color={theme.activeIcon}
              name="theme-light-dark"
              size={28}
              style={styles.ctaRowLeftIcon}
            />
            <Text style={styles.ctaRowText}>{locale.t('screens.settings.actions.theme')}</Text>
            <Spacer />
            <Text style={[styles.ctaRowText, theme.selectedValueText]}>{colorScheme.name}</Text>
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
  closeLogoutDialog: PropTypes.func.isRequired,
  colorScheme: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  logoutDialog: PropTypes.bool.isRequired,
  openLogoutDialog: PropTypes.func.isRequired,
  navigateToPassword: PropTypes.func.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
  preferredCurrency: PropTypes.string.isRequired,
  setColorScheme: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired,
};

export default SettingsScreenComponent;
