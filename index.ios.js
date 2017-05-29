import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reducers from './app/reducers/index';
import App from './app/components/App';


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