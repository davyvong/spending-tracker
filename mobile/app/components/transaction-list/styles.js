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
  actionSheet: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  actionSheetRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionSheetColumn1: {
    alignItems: 'flex-start',
    flex: 1,
  },
  actionSheetColumn2: {
    alignItems: 'flex-end',
  },
  actionSheetLargeText: {
    fontSize: normalizeText(14),
  },
  actionSheetSmallText: {
    marginTop: 4,
  },
});

export default styles;
