import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { Actions } from 'react-native-router-flux';
import { signupUser } from '../actions/login';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: '',
        fName: '',
        lName: '',
        password: '',
        username: '',
      }
    };
    // this.handleClick = this.handleClick.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
  }

  // handleChange(e) {
  //   const name = e.target.name;
  //   this.setState({ [name]: e.target.value });
  // }


  emailChange(text) {
    console.log('this is the text line 30', text);
    this.setState({
      userInfo: { ...this.state.userInfo, email: text },
    });
  }
  fNameChange(text) {
    this.setState({
      userInfo: { ...this.state.userInfo, fName: text },
    });
  }
  lNameChange(text) {
    console.log('this is the text line 30', text);
    this.setState({
      userInfo: { ...this.state.userInfo, lName: text },
    });
  }
  passwordChange(text) {
    this.setState({
      userInfo: { ...this.state.userInfo, password: text },
    });
  }
  usernameChange(text) {
    this.setState({
      userInfo: { ...this.state.userInfo, username: text },
    });
  }

  // handleClick() {
  //   this.props.signupUser(this.state)
  // }
//onSubmit={(e) => { e.preventDefault(); this.props.signupUser(this.state, this.props.history); }} autoComplete="on">

  render() {
    console.log('this is the props on loginform',this.props)
    console.log('this is the state on loginform',this.state)

    return (
      <View behavior="padding" style={styles.container}>
        <TextInput
          type="text"
          placeholder="Enter Your Email fool"
          onChangeText={text => this.emailChange(text)}
          style={styles.input}
        />
        <TextInput 
          type="password"
          placeholder="Enter Your Password fool"
          onChangeText={text => this.passwordChange(text)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput 
          type="text"
          placeholder="Enter Your FirstName fool"
          onChangeText={text => this.fNameChange(text)}
          style={styles.input}
        />
        <TextInput 
          type="text"
          placeholder="Enter Your LastName fool"
          onChangeText={text => this.lNameChange(text)}
          style={styles.input}
        />
        <TextInput 
          type="text"
          placeholder="Enter Your UserName fool"
          onChangeText={text => this.usernameChange(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          {/*<Text style={styles.buttonText} onPress={() => this.handleClick()}>Sign Up</Text>*/}
          <Text style={styles.buttonText} onPress={() => { this.props.signupUser(this.state.userInfo); }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// const mapStateToProps = (state) => {
//   const { email, username, userType, fName, lName, cohort } = state.profile;
//   return {
//     email
//   };
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//       onSignUp: (datThang) => { dispatch(signupUser(datThang))}
//   }
// }

export default connect(null, { signupUser })(SignUp);

const styles = StyleSheet.create({
  container: {
    padding: 90,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,255,0.3)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
