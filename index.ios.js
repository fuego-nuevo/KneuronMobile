import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components';

import App from "./app/components/App";
import Login from './app/components/Login';
import {Scene, Router, Actions} from 'react-native-router-flux';


/*export default class kneuronMobile extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login Bitches"/>
      </Scene>
    </Router>
  }
  }

AppRegistry.registerComponent('kneuronMobile', () => kneuronMobile);*/


AppRegistry.registerComponent("homemade", () => App);
