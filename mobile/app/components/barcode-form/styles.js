import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: -8,
    minHeight: '100%',
    paddingBottom: 12,
    paddingHorizontal: 24,
    paddingTop: 6,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  fieldTitle: {
    marginVertical: 8,
  },
  fieldError: {
    marginTop: 8,
  },
  attributeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  attributeRowSpacer: {
    marginTop: 12,
  },
  attributeRowHover: {
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
  attribute: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  attributeText: {
    flex: 1,
  },
  attributeSkeleton: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  attributeSkeletonIcon: {
    marginLeft: -4,
    marginRight: 8,
  },
  attributeDelete: {
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
