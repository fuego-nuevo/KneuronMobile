import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from './Login/Login';
import Home from './Home';
import Signup from './Login/SignUp';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import Lecture from './Lectures/Lecture';
import LiveLecture from './Live/LiveLecture';
import LiveQuiz from './Live/LiveQuiz';
import EditProfile from './Profile/EditProfile';
import CameraRoute from './Camera/CameraRoute';
import LoginNew from './Login/LoginNew';

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
          <Scene key="login" component={LoginNew} hideNavBar={true} title="Login" isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} initial />
          <Scene key="home" component={Home} hideNavBar={true} title="Kneuron" />
          <Scene key="signup" component={Signup} hideNavBar={true} title="Sign Up" />
          <Scene key="profile" component={Profile} hideNavBar={true} title="Profile Page" />
          <Scene key="navbar" component={NavBar} hideNavBar={true} title="Nav" dispatch={dispatch} />
          <Scene key="lecture" component={Lecture} hideNavBar={true} title="lecture" />
          <Scene key="livelecture" component={LiveLecture} hideNavBar={true} title="LiveLecture" />
          <Scene key="livequiz" component={LiveQuiz} hideNavBar={true} title="Pop Quiz" />
          <Scene key="cameraroute" component={CameraRoute} hideNavBar={true} title="CameraRoute" />
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
