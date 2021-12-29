import BarcodeGenerator from '@kichiyaki/react-native-barcode-generator';
import Text from 'components/text';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';
import FlipCard from 'react-native-flip-card';

import styles from './styles';

const BarcodeCardComponent = ({
  amount,
  attributes,
  currency,
  dimensions,
  isFlipped,
  name,
  theme,
  toggleFlipped,
  value,
  ...props
}) => (
  <Pressable {...props} onPress={toggleFlipped}>
    <FlipCard clickable={false} flip={isFlipped} flipHorizontal flipVertical={false} friction={10}>
      <View style={[styles.card, theme.card]}>
        <LinearGradient colors={theme.cardGradient} style={styles.cardGradient} />
        <View style={styles.cardHeader}>
          <View>
            <Text style={[styles.cardText, theme.cardSecondaryText]}>{name}</Text>
            <Text style={[styles.cardText, styles.cardNameText, theme.cardPrimaryText]}>{`${amount} ${currency}`}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View />
          <Text style={[styles.cardText, theme.cardSecondaryText]}>
            {attributes.map(attribute => `${attribute.name}: ${attribute.value}`).join('\n')}
          </Text>
        </View>
      </View>
      <View style={[styles.card, styles.cardBack, theme.cardBack]}>
        <BarcodeGenerator
          background={theme.cardBarcode.background}
          format="CODE128"
          lineColor={theme.cardBarcode.line}
          maxWidth={dimensions.width - 72}
          text={value}
          textStyle={styles.cardBarcodeText}
          value={value}
        />
      </View>
    </FlipCard>
  </Pressable>
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
  isFlipped: PropTypes.bool.isRequired,
  name: PropTypes.string,
  theme: PropTypes.object,
  toggleFlipped: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default BarcodeCardComponent;
