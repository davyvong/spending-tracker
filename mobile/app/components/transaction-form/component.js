import Button from 'components/button';
import CurrencyInput from 'components/currency-input';
import DateInput from 'components/date-input';
import RadioPickerInput from 'components/radio-picker-input';
import Text from 'components/text';
import VendorAutoComplete from 'components/vendor-autocomplete';
import TextInput from 'components/text-input';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const TransactionFormComponent = ({
  applySelectedItem,
  cardOptions,
  categoryOptions,
  closeItemModal,
  editable,
  errors,
  selectedItem,
  setSelectedItem,
  theme,
  updateSelectedItem,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  return (
    <Fragment>
      <RadioPickerInput
        editable={editable}
        error={errors.cardId && locale.t(errors.cardId)}
        label={locale.t('components.transaction-form.labels.card')}
        onChange={updateValue('cardId')}
        options={cardOptions}
        value={values.cardId}
      />
      <DateInput
        editable={editable}
        error={errors.postDate && locale.t(errors.postDate)}
        format="MMMM D, YYYY"
        label={locale.t('components.transaction-form.labels.date')}
        onChange={updateValue('postDate')}
        value={values.postDate}
      />
      <VendorAutoComplete
        editable={editable}
        error={errors.vendor && locale.t(errors.vendor)}
        label={locale.t('components.transaction-form.labels.vendor')}
        onChange={updateValue('vendor')}
        value={values.vendor}
      />
      <TextInput
        editable={editable}
        label={locale.t('components.transaction-form.labels.description')}
        onChangeText={updateValue('description')}
        value={values.description}
      />
      <RadioPickerInput
        editable={editable}
        error={errors.categoryId && locale.t(errors.categoryId)}
        label={locale.t('components.transaction-form.labels.category')}
        onChange={updateValue('categoryId')}
        options={categoryOptions}
        value={values.categoryId}
      />
      {values.items.map((item, index) => (
        <Pressable key={index} onPress={() => setSelectedItem({ ...item, index })}>
          <Text>
            Item {index} {item.description} {item.amount}
          </Text>
        </Pressable>
      ))}
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={selectedItem !== null}
        onBackButtonPress={closeItemModal}
        onBackdropPress={closeItemModal}
        style={styles.modal}
        useNativeDriverForBackdrop={false}
      >
        <View style={[styles.innerModal, theme.innerModal]}>
          {selectedItem !== null && (
            <Fragment>
              <TextInput
                editable={editable}
                label={locale.t('components.transaction-form.labels.description')}
                onChangeText={updateSelectedItem('description')}
                value={selectedItem.description}
              />
              <CurrencyInput
                editable={editable}
                error={errors.amount && locale.t(errors.amount)}
                hideCurrency
                label={locale.t('components.transaction-form.labels.amount')}
                onChangeAmount={updateSelectedItem('amount')}
                valueAmount={selectedItem.amount}
              />
            </Fragment>
          )}
          <View style={styles.buttonRow}>
            <Button onPress={closeItemModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.transaction-form.buttons.cancel')}</Text>
            </Button>
            <Button
              onPress={applySelectedItem}
              style={styles.button}
              title={locale.t('components.transaction-form.buttons.apply')}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

TransactionFormComponent.defaultProps = {
  editable: true,
  items: [],
};

TransactionFormComponent.propTypes = {
  applySelectedItem: PropTypes.func.isRequired,
  cardOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  closeItemModal: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  selectedItem: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  updateSelectedItem: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default TransactionFormComponent;
