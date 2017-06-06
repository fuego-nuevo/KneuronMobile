import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  // StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../../actions/login';

const { width, height } = Dimensions.get("window");

const background = require('../images/loginpic.jpg');
// const mark = require("./login1_mark.png");
// const lockIcon = require("./login1_lock.png");
// const personIcon = require("./login1_person.png");

export default class LoginNew extends Component {

// componentWillMount() {
//   StatusBar.setHidden(true);
// }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  emailChange(text) {
    console.log('this is the text line 30', text);
    this.setState({
      email: text,
    });
  }

  passwordChange(text) {
    this.setState({
      password: text,
    });
  }

  handleLoginClick() {
    // console.log('this is the props on line 26', this.props);
    const email = this.state.email.toLowerCase().replace(/\s/g, '');
    const password = this.state.password.replace(/\s/g, '');
    const creds = { email: email, password: password };
    this.props.onLoginClick(creds);
  }

  render() {
        console.log('this is the props on line 26', this.props);

    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={background} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={'https://www.iconfinder.com/data/icons/ui-1/60/05-512.png'} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                onChangeText={text => this.emailChange(text)}
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={'http://www.endlessicons.com/wp-content/uploads/2013/05/lock-icon-2-614x460.png'} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input}
                onChangeText={text => this.passwordChange(text)} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText} onPress={() => this.handleLoginClick()}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.signupLinkText} onPress={Actions.signup}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});