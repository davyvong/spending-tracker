import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  chartArea: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 20,
  },
  barColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: 16,
  },
  barLabel: {
    fontSize: normalizeText(13),
    marginBottom: 4,
    marginLeft: -22,
    textAlign: 'center',
    width: 60,
  },
  filledBar: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  xAxis: {
    alignSelf: 'stretch',
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  xLabel: {
    fontSize: normalizeText(13),
    textAlign: 'center',
    width: 40,
  },
});

export default styles;
