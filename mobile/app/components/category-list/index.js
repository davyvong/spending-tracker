import useTheme from 'hooks/theme';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import isFunction from 'utils/is-function';

import CategoryListComponent from './component';

const CategoryList = props => {
  const { palette } = useTheme();
  const [scrollReachedTop, setScrollReachedTop] = useState(true);

  const theme = useMemo(
    () => ({
      headerContent: {
        backgroundColor: palette.get('appBackground'),
      },
      headerShadow: {
        shadowColor: palette.get('shadow'),
      },
    }),
    [palette],
  );

  const onScroll = useCallback(
    event => {
      const { contentOffset } = event.nativeEvent;
      if (scrollReachedTop && contentOffset.y !== 0) {
        setScrollReachedTop(false);
      } else if (!scrollReachedTop && contentOffset.y === 0) {
        setScrollReachedTop(true);
      }
      if (isFunction(props.onScroll)) {
        props.onScroll(event);
      }
    },
    [props.onScroll, scrollReachedTop],
  );

  return <CategoryListComponent {...props} onScroll={onScroll} scrollReachedTop={scrollReachedTop} theme={theme} />;
};

CategoryList.propTypes = {
  onScroll: PropTypes.func,
};

export default CategoryList;
