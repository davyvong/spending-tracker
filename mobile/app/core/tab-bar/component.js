import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from 'components/text';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import styles from './styles';

const TabBarComponent = ({ descriptors, navigation, state, theme }) => {
  const renderRoute = useCallback(
    (route, index) => {
      const descriptor = descriptors[route.key];
      const active = state.index === index;
      const onPress = () => {
        if (get(route, 'state.index', 0) > 0) {
          navigation.navigate(route.state.routeNames[0]);
        } else {
          navigation.navigate(route.name);
        }
      };
      const { icon, title } = descriptor.options;
      return (
        <Pressable key={route.key} onPress={onPress} style={styles.item}>
          <MaterialCommunityIcons
            color={active ? theme.activeItemIcon.color : theme.defaultItemIcon.color}
            name={icon}
            size={28}
            style={styles.itemIcon}
          />
          <Text style={[styles.itemText, active ? theme.activeItemText : theme.defaultItemText]}>{title}</Text>
        </Pressable>
      );
    },
    [descriptors, navigation, state, theme],
  );

  return <View style={[styles.container, theme.container]}>{state.routes.map(renderRoute)}</View>;
};

TabBarComponent.propTypes = {
  descriptors: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  state: PropTypes.object,
  theme: PropTypes.object,
};

export default TabBarComponent;
