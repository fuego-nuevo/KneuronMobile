// import {
//   React,
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// import App from "./app/components/App";
// AppRegistry.registerComponent("kneuronMobile", () => App);

//_______________________________________________________________________

// import Login from './app/components/Login';
// import {Scene, Router, Actions} from 'react-native-router-flux';


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


//_______________________________________________________________________

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './app/components/App';
import { createStore, applyMiddleware } from 'redux';
import Reducers from './app/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const logger = createLogger({});
const middleware = [
  thunkMiddleware,
  logger,
];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);


const store = createStoreWithMiddleware(Reducers);

export default class kneuronMobile extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
// store={store}
AppRegistry.registerComponent('kneuronMobile', () => kneuronMobile);