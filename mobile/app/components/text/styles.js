import { fontFamilies } from 'constants/fonts';
import { StyleSheet } from 'react-native';
import normalizeText from 'utils/normalize-text';

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamilies.productSansRegular,
    fontSize: normalizeText(12),
  },
});

export default styles;
