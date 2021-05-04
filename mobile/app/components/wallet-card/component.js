import Text from 'components/text';
import { getCardType } from 'constants/cards';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const WalletCardComponent = ({ color, company, id, name, theme, type }) => {
  const cardType = getCardType(type);

  return (
    <View key={id} style={[styles.walletCard, { backgroundColor: color }]}>
      <LinearGradient colors={theme.walletCardGradient} style={styles.walletCardGradient} />
      <View style={styles.walletCardHeader}>
        <View>
          <Text style={[styles.walletCardText, theme.walletCardSecondaryText]}>{company}</Text>
          <Text style={[styles.walletCardText, styles.walletCardNameText, theme.walletCardPrimaryText]}>{name}</Text>
        </View>
      </View>
      <View style={styles.walletCardFooter}>
        <View />
        <Text style={[styles.walletCardText, theme.walletCardSecondaryText]}>{cardType?.name}</Text>
      </View>
    </View>
  );
};

WalletCardComponent.propTypes = {
  color: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default WalletCardComponent;
