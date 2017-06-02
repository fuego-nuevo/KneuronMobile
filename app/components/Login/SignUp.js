import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { signupUser } from '../../actions/login';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import axios from 'axios';
// require('dotenv').config();
// import {app_id , app_key} from 'react-native-dotenv';



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
        image: '',
      },
    };
    // this.handleClick = this.handleClick.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
  }

  // handleChange(e) {
  //   const name = e.target.name;
  //   this.setState({ [name]: e.target.value });
  // }

  takePicture() {
    console.log('helloo')
    this.camera.capture()
      .then((data) => {
        // Camera.constants.CaptureTarget.cameraRoll

        console.log('this is the data ',data)
        console.log("this is ther data.path ",data.path);
        RNFS.readFile(data.path, 'base64')
        .then(res => {
          // console.log("this is the res of the readfile" ,res)
          const body = {
            'image': res,
            'subject_id': this.state.userInfo.username,
            'gallery_name': 'kneuron'
          }
          // console.log('this is the body.image of signup ',body.image)
          this.imageChange(res);
          axios.post("http://localhost:8080/api/camera", body)
          // .then(res => {
          //   console.log("this is the res after enrolling your picture to gallery",res)
          // })
          .then(res => {
            console.log('this is the res after enrolling picture',res);
          })
        })
      })
      .catch(err => console.error(err));
  }


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
  imageChange(text) {
    this.setState({
      userInfo: { ...this.state.userInfo, image: text },
    });
  }

  // handleClick() {
  //   this.props.signupUser(this.state)
  // }
//onSubmit={(e) => { e.preventDefault(); this.props.signupUser(this.state, this.props.history); }} autoComplete="on">

  render() {
    console.log('this is the props on loginform', this.props);
    console.log('this is the state on loginform', this.state);

    return (
      <View behavior="padding" style={styles.container}>
        <View>
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
        </View>
        <View style={styles.camera}>
          <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.stretch}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"

        >
          <Text style={{padding: 0}}>Profile Pic</Text>
        </TouchableHighlight>
        </Camera>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          {/*<Text style={styles.buttonText} onPress={() => this.handleClick()}>Sign Up</Text>*/}
          <Text style={styles.buttonText} onPress={() => { this.props.signupUser(this.state.userInfo); }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, { signupUser })(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 65,
  },
  camera: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'yellow',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: -5
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
