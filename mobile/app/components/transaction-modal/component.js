import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import Category from 'models/category';
import Transaction from 'models/transaction';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const TransactionModalComponent = ({ category, onClose, onEdit, theme, transaction }) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [],
  );

  const transactionAmount = useMemo(() => {
    if (!transaction) return null;
    const amount = locale.toCurrency(transaction.amount, { unit: '' });
    return `${transaction.sign}${amount}`;
  }, [locale, transaction]);

  return (
    <Modal
      backdropTransitionOutTiming={0}
      isVisible={Boolean(transaction)}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
      useNativeDriverForBackdrop={false}
    >
      <View style={[styles.innerModal, theme.innerModal]}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{locale.t('components.transaction-modal.fields.date')}</Text>
          <Text style={styles.fieldValue}>{transaction?.postDate}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{locale.t('components.transaction-modal.fields.vendor')}</Text>
          <Text style={styles.fieldValue}>{transaction?.vendor}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{locale.t('components.transaction-modal.fields.description')}</Text>
          <Text style={styles.fieldValue}>{transaction?.description || locale.t('common.not-applicable')}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{locale.t('components.transaction-modal.fields.amount')}</Text>
          <Text style={styles.fieldValue}>
            {transactionAmount} {transaction?.currencyCode}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{locale.t('components.transaction-modal.fields.category')}</Text>
          <Text style={styles.fieldValue}>{category?.name}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button onPress={onClose} style={getCancelButtonStyle}>
            <Text>{locale.t('components.transaction-modal.buttons.close')}</Text>
          </Button>
          <Button
            onPress={onEdit}
            style={styles.button}
            title={locale.t('components.transaction-modal.buttons.edit')}
          />
        </View>
      </View>
    </Modal>
  );
};

TransactionModalComponent.propTypes = {
  category: Category.propTypes,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  transaction: Transaction.propTypes,
};

export default TransactionModalComponent;
