import { useApolloClient } from '@apollo/client';
import * as vendorsQueries from 'graphql/queries/vendors';
import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import VendorAutoCompleteComponent from './component';

const VendorAutoComplete = ({ onChange, value, ...props }) => {
  const client = useApolloClient();
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const textInputRef = useRef();

  const theme = useMemo(
    () => ({
      suggestionList: {
        backgroundColor: palette.get('backgrounds.modal'),
        shadowColor: palette.get('shadow'),
      },
      suggestionRowPressed: {
        backgroundColor: palette.get('backgrounds.secondaryButtonPressed'),
      },
    }),
    [palette],
  );

  useEffect(() => {
    getSuggestions();
  }, [value]);

  const getSuggestions = useCallback(async () => {
    if (value) {
      const { data } = await client
        .query({
          query: vendorsQueries.vendors,
          variables: { name: value },
        })
        .catch();
      setSuggestions(data.vendors || []);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const onBlur = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeText = useCallback(
    text => {
      onChange(text);
      if (!open) {
        setOpen(true);
      }
    },
    [onChange, open],
  );

  const onPress = useCallback(() => {
    setOpen(true);
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [textInputRef]);

  const onSelectAndClear = useCallback(
    suggestion => {
      onChange(suggestion);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <VendorAutoCompleteComponent
      {...props}
      onBlur={onBlur}
      onChangeText={onChangeText}
      onPress={onPress}
      onSelect={onSelectAndClear}
      open={open}
      query={value}
      setQuery={onChange}
      suggestions={suggestions}
      textInputRef={textInputRef}
      theme={theme}
    />
  );
};

VendorAutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default VendorAutoComplete;
