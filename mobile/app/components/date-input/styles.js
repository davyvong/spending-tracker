import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
    marginHorizontal: 24,
    marginTop: 120,
  },
  innerModal: {
    borderRadius: 10,
    paddingBottom: 18,
    paddingTop: 12,
  },
  calendar: {
    paddingHorizontal: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: 9,
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
  calendarIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default styles;
