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
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: -9,
    marginTop: 18,
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 9,
  },
});

export default styles;
