import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

export default class LaunchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>OMDb Explorer</Text>
        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Main')}}>
        <Icon.Ionicons
          name={"md-arrow-forward"}
          size={26}
          // style={{ marginBottom: -3 }}
          color={"#fff"}
      />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#e28044',
    fontSize: 40,
    fontWeight: "900",
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 44,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: 44,
    marginBottom: 44,
  },
  buttonText: {
    color: "#fff",
  }
});
