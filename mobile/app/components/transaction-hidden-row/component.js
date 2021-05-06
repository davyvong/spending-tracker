import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const TransactionHiddenRowComponent = ({ onDeleteItem, onEditItem, pendingDelete, theme, transaction }) => {
  const getDeleteButtonStyle = useCallback(
    ({ pressed }) =>
      pressed ? [styles.hiddenRowButton, theme.pressedDeleteButton] : [styles.hiddenRowButton, theme.deleteButton],
    [theme],
  );

  return (
    <View style={styles.hiddenRow}>
      <Button onPress={() => onEditItem(transaction)} style={styles.hiddenRowButton}>
        <MaterialIcons color={theme.iconColor} name="edit" size={20} />
      </Button>
      <Button disabled={pendingDelete} onPress={() => onDeleteItem(transaction)} style={getDeleteButtonStyle}>
        {pendingDelete ? (
          <ActivityIndicator color={theme.iconColor} />
        ) : (
          <MaterialIcons color={theme.iconColor} name="delete" size={20} />
        )}
      </Button>
    </View>
  );
};

TransactionHiddenRowComponent.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  pendingDelete: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  transaction: Transaction.propTypes,
};

export default TransactionHiddenRowComponent;
