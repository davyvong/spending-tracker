import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
  },
  statisticRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  statisticCard: {
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 6,
    padding: 12,
  },
  statisticAmount: {
    fontSize: normalizeText(16),
    marginTop: 6,
  },
  statisticCurrency: {
    fontSize: normalizeText(12),
  },
});

export default styles;
