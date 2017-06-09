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
  Dimensions,
  ScrollView,
} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import Navbar from '../NavBar/NavBar';
import axios from 'axios';
import Config from 'react-native-config';
const { width, height } = Dimensions.get("window");

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
      axios.put(`${Config.Local_Host}/api/students/${res}`, body)
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
      <Container>
        <ScrollView behavior="padding" style={styles.container}>
          <TextInput
            type="text"
            refs="fName"
            placeholder="Enter Your First Name"
            onChangeText={text => this.fNameChange(text)}
            style={{height: 40, backgroundColor: 'white', marginTop: 80, textAlign: 'center', margin: 20, borderRadius: 8}}
            
          />
          <TextInput
            type="text"
            refs="lName"
            placeholder="Enter Your Last Name"
            onChangeText={text => this.lNameChange(text)}
            style={{height: 40, textAlign: 'center', backgroundColor: '#DDDDDD', borderRadius: 8, margin: 20} }
          />
          <TextInput
            type="text"
            refs="username"
            placeholder="Enter Your Username"
            onChangeText={text => this.userNameChange(text)}
            style={{height: 40, textAlign: 'center', backgroundColor: 'grey', borderRadius: 8, margin: 20}}
          />        
          <Button style={{margin: 0, borderRadius: 20, backgroundColor: 'green', height: 40, width: '45%', textAlign: 'center', left: '4%', marginBottom: 75 }}>
            <Text onPress={() => this.handleClick()}>Update Profile</Text>
          </Button>
        </ScrollView >
        <View style={{position: 'relative', bottom: 13, width: '100%'}}>
          <Navbar />
        </View>
      </Container>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    position: 'relative',
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
    textAlign: 'center',
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

