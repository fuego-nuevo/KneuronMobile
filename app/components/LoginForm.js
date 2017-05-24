import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components';


export default class Login extends Component {
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <TextInput 
          placeholder="Enter Your Email fool"
          style={styles.input} 
          />
        <TextInput 
          placeholder="Enter Your Password fool"
          secureTextEntry
          style={styles.input} 
          />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,255,0.3)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});