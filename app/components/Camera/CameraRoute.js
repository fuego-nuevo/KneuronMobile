import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import { LatLonEllipsoidal } from 'geodesy';
import Config from 'react-native-config';
import Toast from 'react-native-simple-toast';

const socket = io(`${Config.Local_Host}`);

// import {app_id , app_key} from 'react-native-dotenv';
class CameraRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      present: null,
    };
    // console.log('this is the app id and app key', app_id, app_key);
    // this.getUserCoords = this.getUserCoords.bind(this);
  }


  // getUserCoords() {
  //   if('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       console.log("inside  coord loc baby!: ", position.coords.latitude);
  //       this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
  //     })
  //   }
  // }
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
            gallery_name: 'kneuron2',
          };
          axios.post(`${Config.Local_Host}/api/facialVerify`, body)
          .then(res => {
            console.log('this is the verification for kairo sent pic ', res);
            if (res.data.images[0].transaction.confidence > .60 ) {
              this.setState({present: true})
              console.log('you are who you say you are');
              Toast.show('You have been marked present!', Toast.LONG);
              let attendance = {
                lecture_id: this.props.currentLecture.id,
                student_id: this.props.profile.id,
                present: true,
              };
              axios.post(`${Config.Local_Host}/api/studentAttendance`, attendance)
              .then(res => {
                console.log('this is the res from posting attendance', res);
                socket.emit('student-track', {
                name: this.props.profile.fName + " " + this.props.profile.lName,
                present: true,
                teacher: this.props.teacher.teacher_id,
              });

              });
            } else {
              this.setState({present: false})
              let attendance = {
                lecture_id: this.props.currentLecture.id,
                student_id: this.props.profile.id,
                present: false,
              };
              axios.post(`${Config.Local_Host}/api/studentAttendance`, attendance)
              .then(res => {
                console.log('this is the res from posting attendance', res);
              Toast.show('You have been marked absent!', Toast.LONG); 
              socket.emit('student-track', {
                name: this.props.profile.fName + " " + this.props.profile.lName,
                present: false,
                teacher: this.props.teacher.teacher_id,
              });              
              });
              console.log('who the fuckk are you broo');
            }
        // .catch(err => {
        //   console.log("there was an error verifying the kairo pic ", err);
        // })
          })
          .catch((err) => {
            console.log('this is err for verifying kairo', err);
          });
        });
      })
      .catch(err => console.error(err));
  }


  render() {
    console.log('this is the props of camera roll!!!!!!!!!!!!!!!!', this.props)
    console.log('this is the props of currentlecture[0]!!', this.props.currentLecture)

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          type={Camera.constants.Type.front}>
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
          underlayColor='rgba(255, 255, 255, 0.5)'
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
  currentLecture: state.CurrentLecture,
  currentLectureTopics: state.CurrentLectureTopics,
  teacher: state.currentCohort,
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

