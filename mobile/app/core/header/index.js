import { MaterialIcons } from '@expo/vector-icons';
import Text from 'components/text';
import useTheme from 'hooks/theme';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import HeaderComponent from './component';
import styles from './styles';

const Header = ({ navigation, previous, scene }) => {
  const { palette } = useTheme();

  const theme = useMemo(
    () => ({
      backIcon: palette?.get('texts.normal'),
    }),
    [palette],
  );

  const prevOptions = useMemo(() => get(previous, 'descriptor.options', {}), [previous]);
  const currOptions = useMemo(() => get(scene, 'descriptor.options', {}), [scene]);

  const renderLeft = useCallback(() => {
    if (!previous) {
      return null;
    }
    const onPress = get(currOptions, 'headerLeft.onPress', navigation.goBack);
    const title = previous?.route.params?.title || prevOptions.title;
    return (
      <TouchableOpacity onPress={onPress} style={styles.leftButton}>
        <MaterialIcons color={theme.backIcon} name="keyboard-arrow-left" size={24} style={styles.icon} />
        <Text style={styles.leftButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }, [currOptions, navigation, previous, prevOptions]);

  const renderRight = useCallback(() => {
    const headerRight = currOptions.headerRight || {};
    if (headerRight instanceof Function) {
      return headerRight();
    }
    if (isEmpty(headerRight)) {
      return null;
    }
    return (
      <TouchableOpacity onPress={headerRight.onPress} style={styles.rightButton}>
        <Text style={headerRight.style}>{headerRight.label}</Text>
      </TouchableOpacity>
    );
  }, [currOptions]);

  const isHeaderEmpty = Boolean(!previous && isEmpty(currOptions.headerRight));

  return <HeaderComponent isHeaderEmpty={isHeaderEmpty} renderLeft={renderLeft} renderRight={renderRight} />;
};

Header.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
  previous: PropTypes.bool,
  scene: PropTypes.object,
};

export default Header;
