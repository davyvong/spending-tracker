import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingBottom: 6,
    paddingTop: 12,
  },
  ctaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  ctaRowIcon: {
    marginRight: 16,
  },
  ctaRowText: {
    fontSize: normalizeText(16),
  },
});

export default styles;
