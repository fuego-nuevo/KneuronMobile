import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal } from "react-native-router-flux";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from './Login';
import Test from './test';
import Signup from './signup'
import Profile from './profile';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


class App extends Component {

    constructor(props) {
    super(props);
    this.state = {};
    // this.renderDashboard = this.renderDashboard.bind(this);
  }

  // renderDashboard() {
  //   const { isAuthenticated, dispatch } = this.props;
  //   if (isAuthenticated) {
  //     return <Dashboard dispatch={dispatch} />;
  //   }
  //   this.props.history.push('/');
  // }

  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    return (
      <Router>
        <Scene key='root' >          
            <Scene key='login' component={Login} title='Login Bitches' isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} /> 
            <Scene key='test' component={Test} title='Fucking Work'  />
            <Scene key='signup' component={Signup} title='Fucking Work you fuck'  />
            <Scene key='profile' component={Profile} title='Profile Page'  />
            {/*<Scene
              key="/dashboard"
              render={this.renderDashboard} />         */}
        </Scene>
      </Router>
  );
  }
};

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default connect(mapStateToProps)(App);

  /*render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login Bitches"/>
      </Scene>
    </Router>
  }*/