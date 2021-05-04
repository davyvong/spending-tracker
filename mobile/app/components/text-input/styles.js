import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  inputComponent: {
    borderRadius: 5,
    fontSize: normalizeText(12),
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputError: {
    marginTop: 8,
  },
  inputLabel: {
    marginBottom: 8,
  },
});

export default styles;
