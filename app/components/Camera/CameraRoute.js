/*import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
// import NativeModules from 'react-native-image-to-base64';

class CameraRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
    };
  }



  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log("this is the data from camera",data);
        this.setState({ path: data.path })
        // NativeModules.RNImageToBase64.getBase64String(this.state.path, (err, base64) => {
      //     console.log('this is the base64 string',base64)
      // })
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};

export default CameraRoute;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});*/

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
export default class CameraRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: null,
    };
  }

  takePicture() {
    // const options = {};
    //options.location = ...
    this.camera.capture()
      .then((data) => {
        // Camera.constants.CaptureTarget.cameraRoll

        console.log('this is the data ',data)
        console.log("this is ther data.path ",data.path);
        RNFS.readFile(data.path, 'base64')
        .then(res => {
          console.log("this is the res of the readfile" ,res)
          // this.setState({path: res})
        })
      })
      .catch(err => console.error(err));
  }

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



  render() {
    console.log('this is the state of camera', this.state.path)
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          {/*<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>*/}
          <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
        </Camera>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

