import BarcodeGenerator from '@kichiyaki/react-native-barcode-generator';
import Text from 'components/text';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import FlipCard from 'react-native-flip-card';

import styles from './styles';

const BarcodeCardComponent = ({ attributes, dimensions, isFlipped, name, theme, toggleFlipped, value, ...props }) => {
  const renderAttribute = useCallback(
    attribute => (
      <Text key={attribute.name} style={[styles.cardText, theme.cardSecondaryText, styles.cardAttribute]}>
        {`${attribute.name}: ${attribute.value}`}
      </Text>
    ),
    [],
  );

  return (
    <Pressable {...props} onPress={toggleFlipped}>
      <FlipCard clickable={false} flip={isFlipped} flipHorizontal flipVertical={false} friction={10}>
        <View style={[styles.card, theme.card]}>
          <LinearGradient colors={theme.cardGradient} style={styles.cardGradient} />
          <View style={styles.cardHeader}>
            <Text style={[styles.cardText, theme.cardPrimaryText]}>{name}</Text>
          </View>
          <View style={styles.cardFooter}>{attributes.map(renderAttribute)}</View>
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
};

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
