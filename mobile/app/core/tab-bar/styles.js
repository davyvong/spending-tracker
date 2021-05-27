import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    height: 60,
    justifyContent: 'center',
  },
  itemIcon: {
    marginBottom: 2,
  },
  itemText: {
    fontSize: normalizeText(10),
  },
});

export default styles;
