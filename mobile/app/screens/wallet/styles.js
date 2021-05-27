import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  walletCarousel: {
    marginBottom: 12,
    marginHorizontal: -24,
  },
  sectionBlock: {
    marginVertical: 12,
  },
  ctaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
  },
  ctaRowLeftIcon: {
    marginRight: 16,
  },
  ctaRowText: {
    fontSize: normalizeText(14),
  },
  ctaRowRightIcon: {
    marginLeft: 6,
    marginRight: -5,
  },
});

export default styles;
