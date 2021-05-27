import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  transactionRowAmount: {
    fontSize: normalizeText(14),
  },
  transactionRowCurrency: {
    marginTop: 4,
  },
  transactionRowColumn: {
    justifyContent: 'center',
  },
  transactionRowColumn1: {
    marginRight: 18,
    width: 48,
  },
  transactionRowColumn2: {
    maxWidth: 190,
    paddingVertical: 12,
  },
  transactionRowColumn3: {
    alignItems: 'flex-end',
    flex: 1,
    paddingVertical: 12,
  },
  transactionRowCategory: {
    marginTop: 4,
  },
  transactionRowIcon: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  transactionRowVendor: {
    fontSize: normalizeText(14),
  },
});

export default styles;
