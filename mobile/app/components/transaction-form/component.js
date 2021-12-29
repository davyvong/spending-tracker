import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import CurrencyInput from 'components/currency-input';
import DateInput from 'components/date-input';
import RadioPickerInput from 'components/radio-picker-input';
import Text from 'components/text';
import VendorAutoComplete from 'components/vendor-autocomplete';
import TextInput from 'components/text-input';
import { getCurrency } from 'constants/currencies';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Modal from 'react-native-modal';

import styles from './styles';

const TransactionFormComponent = ({
  addItem,
  applySelectedItem,
  cardOptions,
  categoryOptions,
  closeItemModal,
  currency,
  editable,
  errors,
  removeItem,
  selectedItem,
  setSelectedItem,
  StickyHeaderComponent,
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

  const renderTransactionItem = useCallback(
    ({ drag, index, isActive, item }) => (
      <View
        key={index}
        style={[
          styles.transactionItemRow,
          index > 0 && styles.transactionItemRowSpacer,
          isActive && styles.transactionItemRowHover,
          isActive && theme.transactionItemRowHover,
        ]}
      >
        <Pressable
          onLongPress={values.items.length > 1 ? drag : undefined}
          onPress={() => setSelectedItem({ ...item, index })}
          style={[styles.transactionItem, theme.transactionItem]}
        >
          <Text style={[styles.transactionItemText, !item.description && theme.transactionItemMutedText]}>
            {item.description || locale.t('components.transaction-form.labels.description')}
          </Text>
          <Text style={theme.transactionItemMutedText}>
            {locale.toCurrency(item.amount, { precision: getCurrency(currency)?.precision, unit: '' })}
            {currency && ` ${currency}`}
          </Text>
        </Pressable>
        {values.items.length > 1 && (
          <Pressable onPress={() => removeItem(index)} style={styles.transactionItemDelete}>
            <MaterialIcons color={theme.transactionItemDeleteIcon.color} name="delete" size={20} />
          </Pressable>
        )}
      </View>
    ),
    [currency, locale, theme, values.items],
  );

  return (
    <Fragment>
      {StickyHeaderComponent && <View style={styles.header}>{StickyHeaderComponent}</View>}
      <DraggableFlatList
        contentContainerStyle={styles.contentContainer}
        data={values.items}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
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
            <RadioPickerInput
              editable={editable}
              error={errors.categoryId && locale.t(errors.categoryId)}
              label={locale.t('components.transaction-form.labels.category')}
              onChange={updateValue('categoryId')}
              options={categoryOptions}
              value={values.categoryId}
            />
            <Text style={[styles.fieldTitle, theme.fieldTitle]}>
              {locale.t('components.transaction-form.labels.items')}
            </Text>
          </Fragment>
        }
        ListFooterComponent={
          <Fragment>
            {errors.items && <Text style={[styles.fieldError, theme.fieldError]}>{locale.t(errors.items)}</Text>}
            <Pressable
              onPress={addItem}
              style={[
                styles.transactionItemSkeleton,
                theme.transactionItemSkeleton,
                values.items.length > 0 && styles.transactionItemRowSpacer,
              ]}
            >
              <MaterialIcons
                color={theme.transactionItemMutedText.color}
                name="add"
                size={20}
                style={styles.transactionItemSkeletonIcon}
              />
              <Text style={theme.transactionItemMutedText}>
                {locale.t('components.transaction-form.buttons.add-item')}
              </Text>
            </Pressable>
          </Fragment>
        }
        onDragEnd={({ data }) => updateValue('items')(data)}
        renderItem={renderTransactionItem}
      />
      <Modal
        avoidKeyboard
        backdropTransitionOutTiming={0}
        isVisible={selectedItem !== null}
        onBackButtonPress={closeItemModal}
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
  addItem: PropTypes.func.isRequired,
  applySelectedItem: PropTypes.func.isRequired,
  cardOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  closeItemModal: PropTypes.func.isRequired,
  currency: PropTypes.string,
  editable: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
  StickyHeaderComponent: PropTypes.node,
  theme: PropTypes.object.isRequired,
  updateSelectedItem: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default TransactionFormComponent;
