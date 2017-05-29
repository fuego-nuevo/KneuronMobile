import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import LoginForm from './LoginForm';
import { loginUser } from '../actions/login';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../components/images/loginpic.jpg')} />
          <Text style={styles.title}>Login page bitchhess</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            onLoginClick={creds => dispatch(loginUser(creds))}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
  },
});
