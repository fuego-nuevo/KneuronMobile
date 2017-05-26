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

import {Actions} from 'react-native-router-flux';


export default class Login extends Component {

    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);

  }

  emailChange(text) {
    console.log('this is the text line 30',text)
    this.setState({
      email: text,
    });
  }
  passwordChange(text) {
    this.setState({
      password: text,
    });
  }
  handleClick() {
    console.log("this is the refs on line 26", this.refs)
    const email = this.state.email.toLowerCase();
    const password = this.state.password;
    const creds = { email: email, password: password };
    this.props.onLoginClick(creds);
    // console.log('this is email' ,"hi")
  }



  render() {
    console.log("this is the state of email and password",this.state)
    return (
      <View behavior="padding" style={styles.container}>
        <TextInput
          type="text"
          refs="email"
          placeholder="Enter Your Email fool"
          onChangeText={(text) => this.emailChange(text)}
          style={styles.input} 
          />
        <TextInput 
          type="password"
          refs="password"
          placeholder="Enter Your Password fool"
          onChangeText={(text) => this.passwordChange(text)}
          secureTextEntry
          style={styles.input} 
          />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => this.handleClick()}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={Actions.signup}>SignUp</Text>
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