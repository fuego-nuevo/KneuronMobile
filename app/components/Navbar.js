import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import { logoutUser } from '../actions/login';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { logoutUser } = this.props;
    return (
      <Container>
        <Footer >
          <FooterTab>
            <Button onPress={Actions.test}>
              <Text>Home</Text>
            </Button>
            <Button onPress={Actions.profile} >
              <Text>Profile</Text>
            </Button>
            <Button >
              <Text>Stats!</Text>
            </Button>
            <Button>
              <Text onPress={logoutUser}>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default connect(null, { logoutUser })(NavBar);
