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
    paddingVertical: 18,
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  actionButtonIcon: {
    marginRight: 12,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    paddingVertical: 10,
  },
});

export default styles;
