import ActionDialog from 'components/action-dialog';
import Button from 'components/button';
import ScrollView from 'components/scroll-view';
import Text from 'components/text';
import TextInput from 'components/text-input';
import Title from 'components/title';
import { routeOptions } from 'constants/routes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const PasswordScreenComponent = ({
  changePassword,
  closeDiscardDialog,
  closeSaveDialog,
  discardDialog,
  errors,
  hasChanges,
  openSaveDialog,
  navigateBack,
  pending,
  saveDialog,
  setNavigationOptions,
  theme,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  useEffect(() => {
    const renderHeaderRight = () => (
      <Button onPress={openSaveDialog} title={pending ? '' : locale.t('screens.password.buttons.change')}>
        <ActivityIndicator color={theme.activityIndicator} />
      </Button>
    );
    setNavigationOptions({ headerRight: hasChanges ? renderHeaderRight : null });
  }, [hasChanges, locale, openSaveDialog, pending, setNavigationOptions, theme]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        StickyHeaderComponent={<Title>{locale.t(routeOptions.passwordScreen.title)}</Title>}
      >
        <TextInput
          autoCompleteType="password"
          editable={!pending}
          error={errors.currentPassword && locale.t(errors.currentPassword)}
          label={locale.t('screens.password.labels.current-password')}
          onChangeText={updateValue('currentPassword')}
          secureTextEntry
          textContentType="password"
          value={values.currentPassword}
        />
        <TextInput
          editable={!pending}
          error={errors.newPassword && locale.t(errors.newPassword)}
          label={locale.t('screens.password.labels.new-password')}
          onChangeText={updateValue('newPassword')}
          secureTextEntry
          textContentType="password"
          value={values.newPassword}
        />
        <TextInput
          editable={!pending}
          error={errors.confirmPassword && locale.t(errors.confirmPassword)}
          label={locale.t('screens.password.labels.confirm-password')}
          onChangeText={updateValue('confirmPassword')}
          secureTextEntry
          textContentType="password"
          value={values.confirmPassword}
        />
        {errors.server && <Text style={[styles.serverError, theme.serverError]}>{locale.t(errors.server)}</Text>}
      </ScrollView>
      <ActionDialog
        onClose={closeDiscardDialog}
        message={locale.t('screens.password.messages.discard-changes')}
        primaryAction={{
          color: theme.discardButton.backgroundColor,
          label: locale.t('screens.profile.buttons.discard'),
          onPress: navigateBack,
        }}
        visible={discardDialog}
      />
      <ActionDialog
        onClose={closeSaveDialog}
        message={locale.t('screens.password.messages.change-password')}
        primaryAction={{
          label: locale.t('screens.password.buttons.change'),
          onPress: changePassword,
        }}
        visible={saveDialog}
      />
    </View>
  );
};

PasswordScreenComponent.propTypes = {
  changePassword: PropTypes.func.isRequired,
  closeDiscardDialog: PropTypes.func.isRequired,
  closeSaveDialog: PropTypes.func.isRequired,
  discardDialog: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
  openSaveDialog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  saveDialog: PropTypes.bool.isRequired,
  setNavigationOptions: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default PasswordScreenComponent;
