import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Pressable, TextInput } from 'react-native';

import styles from './styles';

const ReadOnlyTextInputComponent = ({ copyToClipboard, isCopied, theme, ...props }) => (
  <Fragment>
    <TextInput {...props} editable={false} onTextChange={() => {}} pointerEvents="none" />
    <Pressable disabled={isCopied} onPress={copyToClipboard} style={styles.copyIcon}>
      <MaterialIcons color={theme.defaultIcon} name={isCopied ? 'check' : 'content-copy'} size={20} />
    </Pressable>
  </Fragment>
);

ReadOnlyTextInputComponent.propTypes = {
  copyToClipboard: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ReadOnlyTextInputComponent;
