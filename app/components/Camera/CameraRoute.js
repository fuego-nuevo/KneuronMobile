import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { connect } from 'react-redux';

// import {app_id , app_key} from 'react-native-dotenv';
class CameraRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
    // console.log('this is the app id and app key', app_id, app_key);
  }

  // takePicture() {
  //   // const options = {};
  //   //options.location = ...
  //   this.camera.capture()
  //     .then((data) => {
  //       // Camera.constants.CaptureTarget.cameraRoll

  //       console.log('this is the data ',data)
  //       console.log("this is ther data.path ",data.path);
  //       RNFS.readFile(data.path, 'base64')
  //       .then(res => {
  //         console.log("this is the res of the readfile" ,res)
  //         // this.setState({path: res})
  //       })
  //     })
  //     .catch(err => console.error(err));
  // }

  // takePicture() {
  //   this.camera.capture()
  //     .then((data) => {
  //       console.log("this is the data from camera",data);
  //       this.setState({ path: data.path })
  //       // NativeModules.RNImageToBase64.getBase64String(this.state.path, (err, base64) => {
  //     //     console.log('this is the base64 string',base64)
  //     // })
  //     })
  //     .catch(err => console.error(err));
  // }

  sendToKairo() {
    this.camera.capture()
      .then((data) => {
        console.log('this is the data from taking kairo photopic', data);
        RNFS.readFile(data.path, 'base64')
        .then(res => {
          console.log('this is the res of the readfile', typeof res);
          const body = {
            image: res,
            subject_id: this.props.profile.username,
            gallery_name: 'kneuron',
        }
          axios.post('http://localhost:8080/api/studentAttendance', body)
          .then(res => {
            console.log('this is the verification for kairo sent pic ', res);
            if (res.data.images[0].transaction.confidence > .60) {
              console.log('you are who you say you are');
            } else {
              console.log('who the fuckk are you broo');
            }
        // .catch(err => {
        //   console.log("there was an error verifying the kairo pic ", err);
        // })
          });
        });
      })
      .catch(err => console.error(err));
  }


  render() {
    console.log("this is the props of camera roll!!!!!!!!!!!!!!!!")
    console.log('this is the state of camera!!', this.state.path)
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          {/*<TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"

        >
          <Text>Profile Pic</Text>
        </TouchableHighlight>*/}
          <TouchableHighlight
          style={styles.capture1}
          onPress={this.sendToKairo.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
        <Text>Attendance</Text>
        </TouchableHighlight>
        </Camera>
      </View>
    );
  }


}
const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(CameraRoute);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'yellow',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: -5,
  },
  capture1: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

