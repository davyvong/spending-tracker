import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const DimensionsContext = createContext({});

export const DimensionsConsumer = DimensionsContext.Consumer;

export const DimensionsProvider = ({ children }) => {
  const getDimensions = useCallback(() => {
    const { height, width } = Dimensions.get('window');
    return { height, width };
  });

  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    const onOrientationChange = () => {
      setDimensions(getDimensions());
    };
    Dimensions.addEventListener('change', onOrientationChange);
    return () => {
      Dimensions.removeEventListener('change', onOrientationChange);
    };
  }, []);

  return <DimensionsContext.Provider value={dimensions}>{children}</DimensionsContext.Provider>;
};

DimensionsProvider.propTypes = {
  children: PropTypes.node,
};

export default DimensionsContext;
