import Text from 'components/text';
import TextInput from 'components/text-input';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const VendorAutoCompleteComponent = ({
  editable,
  onBlur,
  onChangeText,
  onPress,
  onSelect,
  open,
  query,
  suggestions,
  textInputRef,
  theme,
  ...props
}) => {
  const getPressableStyle = useCallback(
    ({ pressed }) => (pressed ? [styles.suggestionRow, theme.suggestionRowPressed] : [styles.suggestionRow]),
    [theme],
  );

  const renderSuggestionRow = useCallback(
    suggestion => (
      <Pressable key={suggestion} onPress={() => onSelect(suggestion)} style={getPressableStyle}>
        <Text>{suggestion}</Text>
      </Pressable>
    ),
    [getPressableStyle, onSelect],
  );

  return (
    <View>
      <Pressable disabled={!editable} onPress={onPress}>
        <TextInput
          {...props}
          editable={editable}
          onBlur={onBlur}
          onChangeText={onChangeText}
          pointerEvents={open ? 'auto' : 'none'}
          inputRef={textInputRef}
          value={query}
        />
      </Pressable>
      {open && suggestions.length > 0 && (
        <View style={[styles.suggestionList, theme.suggestionList]}>{suggestions.map(renderSuggestionRow)}</View>
      )}
    </View>
  );
};

VendorAutoCompleteComponent.defaultProps = {
  editable: true,
};

VendorAutoCompleteComponent.propTypes = {
  editable: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  textInputRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
  theme: PropTypes.object.isRequired,
};

export default VendorAutoCompleteComponent;
