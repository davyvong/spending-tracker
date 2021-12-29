import textStyles from 'components/text/styles';
import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.8,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 12,
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
  },
  cardFooter: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: normalizeText(14),
  },
  cardNameText: {
    marginTop: 5,
  },
  cardBack: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  cardBarcodeText: {
    ...textStyles.text,
    fontSize: normalizeText(14),
    marginTop: 12,
  },
});

export default styles;
