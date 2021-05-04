import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  suggestionList: {
    borderRadius: 5,
    elevation: 5,
    paddingVertical: 8,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});

export default styles;
