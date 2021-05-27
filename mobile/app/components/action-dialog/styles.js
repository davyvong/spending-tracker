import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/texts';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 60,
    marginHorizontal: 24,
  },
  innerModal: {
    borderRadius: 10,
  },
  dialogContent: {
    padding: 18,
  },
  messageText: {
    fontSize: normalizeText(13),
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: -9,
    paddingBottom: 18,
    paddingHorizontal: 18,
  },
  ctaButton: {
    alignItems: 'center',
    borderRadius: 100,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 9,
    paddingHorizontal: 12,
  },
});

export default styles;
