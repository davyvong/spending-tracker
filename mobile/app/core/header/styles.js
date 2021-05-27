import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 41,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  emptyContainer: {
    minHeight: 0,
    paddingTop: 0,
  },
  leftButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftButtonText: {
    fontSize: normalizeText(14),
  },
  rightButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: -5,
    marginRight: 5,
  },
});

export default styles;
