import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionBlock: {
    marginVertical: 12,
  },
  walletCarousel: {
    marginBottom: 12,
    marginHorizontal: -24,
  },
  ctaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
  },
  ctaRowIcon: {
    marginRight: 16,
  },
  ctaRowText: {
    flex: 1,
    fontSize: normalizeText(14),
  },
  ctaRowCaretIcon: {
    marginRight: -6,
  },
});

export default styles;
