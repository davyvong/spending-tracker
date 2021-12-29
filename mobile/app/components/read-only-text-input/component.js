import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { ActivityIndicator, Pressable, TextInput } from 'react-native';

import styles from './styles';

const ReadOnlyTextInputComponent = ({ copyToClipboard, pending, theme, ...props }) => (
  <Fragment>
    <TextInput {...props} editable={false} onTextChange={() => {}} pointerEvents="none" />
    <Pressable onPress={copyToClipboard} style={styles.copyIcon}>
      {pending ? (
        <ActivityIndicator color={theme.defaultIcon} />
      ) : (
        <MaterialIcons color={theme.defaultIcon} name="content-copy" size={20} />
      )}
    </Pressable>
  </Fragment>
);

ReadOnlyTextInputComponent.propTypes = {
  copyToClipboard: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ReadOnlyTextInputComponent;
