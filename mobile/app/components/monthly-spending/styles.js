import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    minHeight: 74,
  },
  pendingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  statisticCard: {
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
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
