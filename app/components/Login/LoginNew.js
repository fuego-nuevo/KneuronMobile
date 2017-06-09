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
  ScrollView,
  // StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { loginUser } from '../../actions/login';

const { width, height } = Dimensions.get("window");

const background = require('../images/loginnewpic.jpg');
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
    const { dispatch, errorMessage, isAuthenticated } = this.props;

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
    this.props.dispatch(loginUser(creds));
  }

  render() {
        const { dispatch, errorMessage, isAuthenticated } = this.props;
        console.log('this is the props on line 26', this.props);

    return (
      <ScrollView style={styles.container}>
          
          <View style={styles.markWrap}>
            <Image source={require('../images/kneuronlogo.png')} style={{width: 100, height: 100, marginLeft: '35%', marginTop: 30}} />
          </View>
          <View style={styles.header}>
            <Text style={styles.bigHeader}>Kneuron</Text>
            <Text style={styles.littleHeader}>Your classroom just got better</Text>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              {/*<View style={styles.iconWrap}>
                <Icon name='ios-contact' style={styles.icon} />
              </View>*/}
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                onChangeText={text => this.emailChange(text)}
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrap}>
              {/*<View style={styles.iconWrap}>
                <Icon name='md-lock' style={styles.icon} />
              </View>*/}
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                style={styles.input}
                onChangeText={text => this.passwordChange(text)} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity style={styles.up} activeOpacity={.5}>
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
          <View style={styles.markWrapTwo}>
          </View>        

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  signbut: {
    zIndex: 2,
    borderColor: 'white',
    borderWidth: 5,
    height: 100,
    marginTop: 250,
    width: '90%',
    marginLeft: '5%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigHeader: {
    fontSize: 28,
    marginBottom: 20,
  },
  littleHeader: {
    fontWeight: '100',
  },
  signpass: {
    zIndex: 2,
    borderColor: 'white',
    borderWidth: 5,
    height: 100,
    marginTop: 450,
    width: '90%',
    marginLeft: '5%',
  },
  goAway: {
    backgroundColor: 'transparent',
    // zIndex: 1,
  },
  markWrap: {
    paddingVertical: 40,
  },
  markWrapTwo: {
    flex: 1,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    position: 'absolute',
    height,
    width: '100%',
    zIndex: -1,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 5,
    height: 30,
    width: '70%',
    marginLeft: '15%',
    // borderRadius: 8,
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
    backgroundColor: '#c2c2d6',
    opacity: .95,
    textAlign: 'center',
    borderRadius: 3,
  },
  button: {
    backgroundColor: "black",

    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: '70%',
    left: '15%',
    opacity: 1,
    height: 35,
    borderRadius: 3,

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
    color: 'black',
    textShadowColor: 'white',
    fontSize: 10,
  },
  signupLinkText: {
    color: '#da0576',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  up: {
    zIndex: 3,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'black',  /* fallback for old browsers */
    opacity: 0.6,
    height,
    width: '100%',
    zIndex: 0,
  },
});

        /*<View style={styles.overlay} />
        <Image source={background}style={styles.background} />

        <View style={styles.signbut}>
          <TextInput
            placeholder="Username" 
            placeholderTextColor="#FFF"
            onChangeText={text => this.emailChange(text)}
          />
        </View>
        <View style={styles.signpass}>
          <TextInput
            placeholder="password" 
            placeholderTextColor="#FFF"
            onChangeText={text => this.passwordChange(text)}
          />
        </View>*/