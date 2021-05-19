import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
    marginHorizontal: 24,
  },
  innerModal: {
    borderRadius: 10,
    maxHeight: '70%',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  optionIcon: {
    marginRight: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: -9,
    marginTop: 18,
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 9,
    paddingVertical: 10,
  },
  expandIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default styles;