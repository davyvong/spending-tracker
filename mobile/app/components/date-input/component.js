import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import Text from 'components/text';
import useLocale from 'hooks/locale';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

import styles from './styles';

const DateInputComponent = ({ editable, format, onChange, theme, value, ...props }) => {
  const [locale] = useLocale();
  const [selected, setSelected] = useState();
  const [visible, setVisible] = useState(false);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const openModal = useCallback(() => {
    if (value) {
      setSelected(value);
    }
    setVisible(true);
  }, [value]);

  const markedDates = useMemo(() => {
    if (!selected) {
      return {};
    }
    return {
      [selected]: {
        selected: true,
      },
    };
  }, [selected]);

  const onApply = useCallback(() => {
    onChange(selected);
    closeModal();
  }, [closeModal, onChange, selected]);

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
  }, []);

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  const formattedValue = useMemo(() => {
    if (!value) {
      return '';
    }
    if (format) {
      return moment(value).format(format);
    }
    return value;
  }, [value]);

  return (
    <Fragment>
      <Pressable disabled={!editable} onPress={openModal}>
        <TextInput {...props} editable={false} pointerEvents="none" value={formattedValue} />
        <MaterialIcons color={theme.defaultIcon} name="calendar-today" size={20} style={styles.calendarIcon} />
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
          <View style={styles.calendar}>
            <Calendar
              current={selected?.dateString}
              markedDates={markedDates}
              onDayPress={onDayPress}
              theme={theme.calendar}
            />
          </View>
          <View style={styles.buttonRow}>
            <Button onPress={closeModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.date-input.buttons.cancel')}</Text>
            </Button>
            <Button onPress={onApply} style={styles.button} title={locale.t('components.date-input.buttons.apply')} />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

DateInputComponent.propTypes = {
  editable: PropTypes.bool.isRequired,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  value: PropTypes.string,
};

export default DateInputComponent;
