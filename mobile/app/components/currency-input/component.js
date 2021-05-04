import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const CurrencyInputComponent = ({
  currencies,
  editable,
  name,
  onChangeAmount,
  onChangeCurrency,
  theme,
  valueAmount,
  valueCurrency,
  ...props
}) => {
  const [locale] = useLocale();
  const [tempCurrency, setTempCurrency] = useState(valueCurrency);
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setTempCurrency(valueCurrency);
    setVisible(true);
  }, [valueCurrency]);

  const onApplyCurrency = useCallback(() => {
    onChangeCurrency(tempCurrency);
    closeModal();
  }, [onChangeCurrency, tempCurrency]);

  const onSelectCurrency = currency => {
    setTempCurrency(currency.value);
  };

  const tempSelectedCurrency = useMemo(() => currencies.findIndex(currency => currency.value === tempCurrency), [
    currencies,
    tempCurrency,
  ]);

  const renderCurrency = useCallback(
    ({ index, item: currency = {} }) => {
      const active = index === tempSelectedCurrency;
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={`${name}.${currency.value}`}
          onPress={() => onSelectCurrency(currency)}
          style={styles.currencyOption}
        >
          <MaterialIcons
            color={theme.iconColor}
            name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
            style={styles.currencyIcon}
          />
          <Text style={theme.currencyText}>{currency.label}</Text>
        </TouchableOpacity>
      );
    },
    [tempSelectedCurrency],
  );

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [],
  );

  return (
    <Fragment>
      <Pressable disabled={!editable} onPress={openModal}>
        <TextInput
          {...props}
          editable={editable}
          keyboardType="numeric"
          onChangeText={onChangeAmount}
          value={valueAmount}
        />
        <View style={[styles.currencyValue, theme.currencyValue]}>
          <Text style={styles.currencyValueText}>{valueCurrency}</Text>
          <MaterialIcons color={theme.iconColor} name="expand-more" size={20} />
        </View>
      </Pressable>
      <Modal
        backdropTransitionOutTiming={0}
        isVisible={visible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={styles.modal}
        useNativeDriverForBackdrop={false}
      >
        <View style={[styles.innerModal, theme.innerModal]}>
          <FlatList
            bounces={false}
            data={currencies}
            keyExtractor={currency => `${name}.${currency.value}`}
            removeClippedSubviews
            renderItem={renderCurrency}
          />
          <View style={styles.buttonRow}>
            <Button onPress={closeModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.radio-picker-input.buttons.cancel')}</Text>
            </Button>
            <Button
              onPress={onApplyCurrency}
              style={styles.button}
              title={locale.t('components.radio-picker-input.buttons.apply')}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

CurrencyInputComponent.defaultProps = {
  currencies: [],
};

CurrencyInputComponent.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  editable: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onChangeAmount: PropTypes.func,
  onChangeCurrency: PropTypes.func,
  theme: PropTypes.object.isRequired,
  valueAmount: PropTypes.string,
  valueCurrency: PropTypes.string,
};

export default CurrencyInputComponent;
