import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cardGradient: {
    bottom: '-100%',
    left: '-100%',
    position: 'absolute',
    right: '-100%',
    top: '-100%',
    transform: [{ rotate: '-45deg' }],
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 18,
  },
  cardText: {
    fontSize: normalizeText(14),
  },
  cardBarcode: {
    borderRadius: 5,
    paddingVertical: 12,
  },
  cardMenuButton: {
    padding: 12,
    position: 'absolute',
    right: -3,
    top: 0,
  },
});

export default styles;
