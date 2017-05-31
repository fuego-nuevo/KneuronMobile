import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from './Login/Login';
import Home from './Home';
import Signup from './Login/SignUp';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import Lecture from './Lectures/Lecture';
import LiveLecture from './Live/LiveLecture';
import EditProfile from './Profile/EditProfile';
import CameraRoute from './Camera/CameraRoute';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    return (
      <Router>
        <Scene key="root" >
          <Scene key="login" component={Login} title="Login" isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} initial />
          <Scene key="home" component={Home} title="Kneuron" />
          <Scene key="signup" component={Signup} title="Sign Up" />
          <Scene key="profile" component={Profile} title="Profile Page" />
          <Scene key="navbar" component={NavBar} title="Nav" dispatch={dispatch} />
          <Scene key="lecture" component={Lecture} title="lecture" />
          <Scene key="livelecture" component={LiveLecture} title="LiveLecture" />
          <Scene key="cameraroute" component={CameraRoute} title="CameraRoute" />
          <Scene key="editprofile" component={EditProfile} title="EditProfile" />
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default connect(mapStateToProps)(App);
