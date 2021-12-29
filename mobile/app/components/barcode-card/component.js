import { MaterialIcons } from '@expo/vector-icons';
import BarcodeGenerator from '@kichiyaki/react-native-barcode-generator';
import Text from 'components/text';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const BarcodeCardComponent = ({ dimensions, name, onPress, theme, value }) => (
  <View style={[styles.card, theme.card]}>
    <LinearGradient colors={theme.cardGradient} style={styles.cardGradient} />
    <View style={styles.cardHeader}>
      <Text style={[styles.cardText, theme.cardText]}>{name}</Text>
    </View>
    <BarcodeGenerator
      background={theme.cardBarcode.background}
      format="CODE128"
      lineColor={theme.cardBarcode.line}
      maxWidth={dimensions.width - 104}
      style={styles.cardBarcode}
      value={value}
    />
    {onPress && (
      <Pressable onPress={onPress} style={styles.cardMenuButton}>
        <MaterialIcons color={theme.defaultIcon} name="more-vert" size={24} />
      </Pressable>
    )}
  </View>
);

BarcodeCardComponent.defaultProps = {
  attributes: [],
};

BarcodeCardComponent.propTypes = {
  amount: PropTypes.number,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  currency: PropTypes.string,
  dimensions: PropTypes.shape({
    width: PropTypes.number,
  }),
  name: PropTypes.string,
  onPress: PropTypes.func,
  theme: PropTypes.object,
  value: PropTypes.string,
};

export default BarcodeCardComponent;
