import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fieldTitle: {
    marginVertical: 8,
  },
  fieldError: {
    marginTop: 8,
  },
  transactionItemRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  transactionItemRowSpacer: {
    marginTop: 12,
  },
  transactionItemRowHover: {
    borderRadius: 5,
    margin: -6,
    padding: 6,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    zIndex: 1,
  },
  transactionItem: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  transactionItemText: {
    flex: 1,
  },
  transactionItemSkeleton: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  transactionItemSkeletonIcon: {
    marginLeft: -4,
    marginRight: 8,
  },
  transactionItemDelete: {
    marginLeft: 12,
    marginRight: 8,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginHorizontal: 12,
  },
  innerModal: {
    borderRadius: 10,
    maxHeight: '70%',
    paddingHorizontal: 24,
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
