import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 53,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  header: {
    left: 0,
    overflow: 'hidden',
    paddingBottom: 8,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerShadow: {
    elevation: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default styles;
