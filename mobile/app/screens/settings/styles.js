import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  ctaRow: {
    paddingVertical: 12,
  },
  ctaRowText: {
    fontSize: normalizeText(16),
  },
});

export default styles;
