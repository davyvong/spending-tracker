import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  card: {
    marginTop: 18,
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
