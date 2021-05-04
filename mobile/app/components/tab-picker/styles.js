import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  option: {
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  optionDefaultText: {
    fontSize: normalizeText(13),
  },
});

export default styles;
