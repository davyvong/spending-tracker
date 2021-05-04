import { MaterialIcons } from '@expo/vector-icons';
import useTheme from 'hooks/theme';
import React, { useMemo } from 'react';

const HeaderIcon = props => {
  const { palette } = useTheme();

  const color = useMemo(() => palette.get('normalText'), [palette]);

  return <MaterialIcons {...props} color={color} />;
};

export default HeaderIcon;
