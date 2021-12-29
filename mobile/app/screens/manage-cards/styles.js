import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 6,
  },
  actionSheet: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
  actionSheetLargeText: {
    fontSize: normalizeText(14),
  },
  actionSheetSmallText: {
    marginTop: 4,
  },
  card: {
    marginTop: 18,
  },
  cardMenuButton: {
    padding: 12,
    position: 'absolute',
    right: -3,
    top: 0,
  },
  cardVisibility: {
    bottom: 0,
    left: 4,
    padding: 12,
    position: 'absolute',
  },
});

export default styles;
