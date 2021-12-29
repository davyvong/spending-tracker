import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardCarousel: {
    marginBottom: 12,
    marginHorizontal: -24,
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
});

export default styles;
