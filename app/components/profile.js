import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components';


export default class Profile extends Component {
    constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  }
})