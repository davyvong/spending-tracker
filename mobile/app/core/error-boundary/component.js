import * as Updates from 'expo-updates';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorDescription}>Something went wrong.</Text>
          {process.env.NODE_ENV === 'development' && (
            <TouchableOpacity onPress={Updates.reloadAsync} style={styles.reloadButton}>
              <Text style={styles.reloadButtonText}>Reload</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
