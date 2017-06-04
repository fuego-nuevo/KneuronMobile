import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import Navbar from '../NavBar/NavBar';
import axios from 'axios';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        fName: 'Jason',
        lName: 'Kim',
        username: 'jtk',
    };
    console.log('what is this?', this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
  }


  // componentDidMount() {
  // }

  fNameChange(text) {
    console.log('this is the text line 30', text);
    this.setState({
      fName: text,
    });
  }


  lNameChange(text) {
    this.setState({
      lName: text,
    });
  }

  userNameChange(text) {
    this.setState({
      username: text,
    });
  }



  handleClick() {
    // event.preventDefault();
    console.log(this.state.fName)
    console.log(this.state.lName)
    console.log(this.state.username)
    const body = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.username,
    };
    AsyncStorage.getItem('id_token')
    .then(res => {
      axios.put(`http://169.254.137.166:5000/api/students/${res}`, body)
      .then(putres => {
        console.log(putres)
      })
    })
    .catch(err => {
      if(err){
        console.log("there was an error updating profile", err)
      }
    })
  }

  render() {
    console.log('this is props from redux profile!', this.props);
    return (
      <View behavior="padding" style={styles.container}>
        <TextInput
          type="text"
          refs="fName"
          placeholder="Enter Your First Name"
          onChangeText={text => this.fNameChange(text)}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          
        />
        <TextInput
          type="text"
          refs="lName"
          placeholder="Enter Your Last Name"
          onChangeText={text => this.lNameChange(text)}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          type="text"
          refs="username"
          placeholder="Enter Your Username"
          onChangeText={text => this.userNameChange(text)}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />        
        <TouchableOpacity style={{padding: 70}}>
          <Text onPress={() => this.handleClick()}>Update Profile</Text>
        </TouchableOpacity>
          <View style={{position: 'absolute', bottom: 0, width: 376}}>
            <Navbar />
          </View>          
      </View >
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    position: 'relative',
    padding: 90,
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
    textAlign: 'center',
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
}

