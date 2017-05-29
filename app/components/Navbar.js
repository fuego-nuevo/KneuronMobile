import React, { Component } from 'react';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {logoutUser} from '../actions/login'

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
class Navbar extends Component {
  constructor(props) {
    super(props);
      this.state = {
      };

}




    render() {
      const { logoutUser } = this.props;
      const { container } = styles;
        return (
            <Container>
                <Footer style={container}>
                    <FooterTab>
                        <Button onPress={Actions.home}>
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


const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
  }
}



export default connect(null, { logoutUser })(Navbar);