import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  optionMonth: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  optionMonthText: {
    fontSize: normalizeText(13),
  },
  optionYearText: {
    marginBottom: 6,
  },
});

export default styles;
