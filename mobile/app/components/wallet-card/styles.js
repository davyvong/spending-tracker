import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  walletCard: {
    aspectRatio: 1.8,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 12,
  },
  walletCardGradient: {
    bottom: '-100%',
    left: '-100%',
    position: 'absolute',
    right: '-100%',
    top: '-100%',
    transform: [{ rotate: '-45deg' }],
  },
  walletCardHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  walletCardFooter: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletCardText: {
    fontSize: normalizeText(14),
  },
  walletCardNameText: {
    marginTop: 5,
  },
});

export default styles;
