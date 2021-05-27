import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorMessage: {
    fontSize: normalizeText(14),
  },
  reloadButton: {
    marginTop: 20,
  },
  reloadButtonText: {
    fontSize: normalizeText(14),
  },
});

export default styles;
