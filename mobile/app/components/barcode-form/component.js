import { MaterialIcons } from '@expo/vector-icons';
import Button from 'components/button';
import RadioPickerInput from 'components/radio-picker-input';
import Text from 'components/text';
import TextInput from 'components/text-input';
import { barcodeFormatOptions } from 'constants/barcodes';
import useLocale from 'hooks/locale';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Modal from 'react-native-modal';

import styles from './styles';

const BarcodeFormComponent = ({
  addAttribute,
  applySelectedAttribute,
  closeAttributeModal,
  editable,
  errors,
  removeAttribute,
  selectedAttribute,
  setSelectedAttribute,
  StickyHeaderComponent,
  theme,
  updateSelectedAttribute,
  updateValue,
  values,
}) => {
  const [locale] = useLocale();

  const getCancelButtonStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.button, theme.cancelButtonPressed] : [styles.button, theme.cancelButton]),
    [theme],
  );

  const renderAttribute = useCallback(
    ({ drag, index, isActive, item }) => (
      <View
        key={index}
        style={[
          styles.attributeRow,
          index > 0 && styles.attributeRowSpacer,
          isActive && styles.attributeRowHover,
          isActive && theme.attributeRowHover,
        ]}
      >
        <Pressable
          onLongPress={values.attributes.length > 1 ? drag : undefined}
          onPress={() => setSelectedAttribute({ ...item, index })}
          style={[styles.attribute, theme.attribute]}
        >
          <Text style={[styles.attributeText, !item.name && theme.attributeMutedText]}>
            {item.name || locale.t('components.barcode-form.labels.name')}
          </Text>
          <Text style={theme.attributeMutedText}>{item.value}</Text>
        </Pressable>
        <Pressable onPress={() => removeAttribute(index)} style={styles.attributeDelete}>
          <MaterialIcons color={theme.attributeDeleteIcon.color} name="delete" size={20} />
        </Pressable>
      </View>
    ),
    [locale, theme, values.attributes],
  );

  return (
    <Fragment>
      {StickyHeaderComponent && <View style={styles.header}>{StickyHeaderComponent}</View>}
      <DraggableFlatList
        contentContainerStyle={styles.contentContainer}
        data={values.attributes}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <Fragment>
            <TextInput
              editable={editable}
              error={errors.name && locale.t(errors.name)}
              label={locale.t('components.barcode-form.labels.name')}
              onChangeText={updateValue('name')}
              value={values.name}
            />
            <TextInput
              editable={editable}
              error={errors.value && locale.t(errors.value)}
              label={locale.t('components.barcode-form.labels.value')}
              onChangeText={updateValue('value')}
              value={values.value}
            />
            <RadioPickerInput
              editable={editable}
              error={errors.format && locale.t(errors.format)}
              label={locale.t('components.barcode-form.labels.format')}
              onChange={updateValue('format')}
              options={barcodeFormatOptions}
              value={values.format}
            />
            <Text style={[styles.fieldTitle, theme.fieldTitle]}>
              {locale.t('components.barcode-form.labels.attributes')}
            </Text>
          </Fragment>
        }
        ListFooterComponent={
          <Fragment>
            {errors.attributes && (
              <Text style={[styles.fieldError, theme.fieldError]}>{locale.t(errors.attributes)}</Text>
            )}
            <Pressable
              onPress={addAttribute}
              style={[
                styles.attributeSkeleton,
                theme.attributeSkeleton,
                values.attributes.length > 0 && styles.attributeRowSpacer,
              ]}
            >
              <MaterialIcons
                color={theme.attributeMutedText.color}
                name="add"
                size={20}
                style={styles.attributeSkeletonIcon}
              />
              <Text style={theme.attributeMutedText}>{locale.t('components.barcode-form.buttons.add-attribute')}</Text>
            </Pressable>
          </Fragment>
        }
        onDragEnd={({ data }) => updateValue('attributes')(data)}
        renderItem={renderAttribute}
      />
      <Modal
        avoidKeyboard
        backdropTransitionOutTiming={0}
        isVisible={selectedAttribute !== null}
        onBackButtonPress={closeAttributeModal}
        style={styles.modal}
        useNativeDriverForBackdrop={false}
      >
        <View style={[styles.innerModal, theme.innerModal]}>
          {selectedAttribute !== null && (
            <Fragment>
              <TextInput
                editable={editable}
                label={locale.t('components.barcode-form.labels.name')}
                onChangeText={updateSelectedAttribute('name')}
                value={selectedAttribute.name}
              />
              <TextInput
                editable={editable}
                label={locale.t('components.barcode-form.labels.value')}
                onChangeText={updateSelectedAttribute('value')}
                value={selectedAttribute.value}
              />
            </Fragment>
          )}
          <View style={styles.buttonRow}>
            <Button onPress={closeAttributeModal} style={getCancelButtonStyle}>
              <Text>{locale.t('components.barcode-form.buttons.cancel')}</Text>
            </Button>
            <Button
              onPress={applySelectedAttribute}
              style={styles.button}
              title={locale.t('components.barcode-form.buttons.apply')}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

BarcodeFormComponent.defaultProps = {
  attributes: [],
  editable: true,
};

BarcodeFormComponent.propTypes = {
  addAttribute: PropTypes.func.isRequired,
  applySelectedAttribute: PropTypes.func.isRequired,
  closeAttributeModal: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  removeAttribute: PropTypes.func.isRequired,
  selectedAttribute: PropTypes.object,
  setSelectedAttribute: PropTypes.func.isRequired,
  StickyHeaderComponent: PropTypes.node,
  theme: PropTypes.object.isRequired,
  updateSelectedAttribute: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default BarcodeFormComponent;
