import Savings from 'assets/svg/savings.svg';
import Button from 'components/button';
import TextInput from 'components/text-input';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import styles from './styles';

const LoginScreenComponent = ({ attempting, attemptSignIn, errors, setEmail, setPassword, theme, values }) => {
  const [locale] = useLocale();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <View style={styles.savingsImage}>
          <Savings height={200} width="100%" />
        </View>
        <TextInput
          autoCompleteType="email"
          containerStyle={styles.textInput}
          editable={!attempting}
          error={errors.email && locale.t(errors.email)}
          keyboardType="email-address"
          label={locale.t('screens.login.inputs.email-label')}
          onChangeText={setEmail}
          placeholder={locale.t('screens.login.inputs.email-placeholder')}
          textContentType="username"
          value={values.email}
        />
        <TextInput
          autoCompleteType="password"
          containerStyle={styles.textInput}
          editable={!attempting}
          error={errors.password && locale.t(errors.password)}
          label={locale.t('screens.login.inputs.password-label')}
          onChangeText={setPassword}
          placeholder={locale.t('screens.login.inputs.password-placeholder')}
          secureTextEntry
          textContentType="password"
          value={values.password}
        />
        <Button
          disabled={attempting}
          onPress={attemptSignIn}
          style={styles.signInButton}
          title={attempting ? '' : locale.t('screens.login.buttons.sign-in')}
        >
          <ActivityIndicator color={theme.activityIndicator} />
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

LoginScreenComponent.propTypes = {
  attempting: PropTypes.bool.isRequired,
  attemptSignIn: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoginScreenComponent;
