import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: -8,
  },
  sectionHeader: {
    marginVertical: 8,
  },
  ctaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
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
