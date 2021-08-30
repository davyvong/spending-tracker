import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 6,
  },
  sectionHeader: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  actionSheetTransaction: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  actionSheetTransactionRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionSheetTransactionColumn1: {
    alignItems: 'flex-start',
    flex: 1,
  },
  actionSheetTransactionColumn2: {
    alignItems: 'flex-end',
  },
  actionSheetTransactionLargeText: {
    fontSize: normalizeText(14),
  },
  actionSheetTransactionSmallText: {
    marginTop: 4,
  },
});

export default styles;
