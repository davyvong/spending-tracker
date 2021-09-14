import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  categoryRowAmount: {
    fontSize: normalizeText(14),
  },
  categoryRowCurrency: {
    marginTop: 4,
  },
  categoryRowColumn: {
    justifyContent: 'center',
  },
  categoryRowColumn1: {
    marginRight: 18,
    width: 48,
  },
  categoryRowColumn2: {
    maxWidth: 190,
    paddingVertical: 12,
  },
  categoryRowColumn3: {
    alignItems: 'flex-end',
    flex: 1,
    paddingVertical: 12,
  },
  categoryRowCategory: {
    marginTop: 4,
  },
  categoryRowIcon: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  categoryRowVendor: {
    fontSize: normalizeText(14),
  },
});

export default styles;
