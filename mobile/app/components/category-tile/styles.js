import { StyleSheet } from 'react-native';
import { normalizeText } from 'utils/styles';

const styles = StyleSheet.create({
  categoryTile: {
    alignItems: 'flex-start',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'column',
    height: 130,
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginHorizontal: 6,
    padding: 12,
  },
  categoryTileImage: {
    aspectRatio: 1.37,
    bottom: 12,
    position: 'absolute',
    right: 12,
    width: '75%',
  },
  categoryTileName: {
    fontSize: normalizeText(16),
  },
});

export default styles;
