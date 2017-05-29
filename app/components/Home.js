/*import React, { Component } from 'react';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import CohortList from './CohortList';

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
class Test extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id_token: ""
      };

}

componentDidMount () {
  AsyncStorage.getItem('id_token')
  .then(res => {
    console.log(res)
    this.setState({id_token: res})
  })
  axios.get(`http://localhost:8080/api/cohort/${this.state.id_token}`)
  .then(res => {
    console.log("here is the res for fetching cohorts", res)
  })
  .catch(err => {
    if(err) {
      console.log("there was an error getting the token", err)
    }
  })
}


    render() {
      console.log("this is the state of token boiz",this.state.id_token);
        return (
            <Container>
                <CohortList />
                <Content />
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
                            <Text>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Test;*/


import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import NavBar from './Navbar';
import {Actions} from 'react-native-router-flux';
import CohortList from './CohortList';

// import { Icons } from 'react-native-vector-icons'

class Test extends Component {
  render() {
    const { container } = styles;
        return (
            <View style={container}>
              <CohortList />
              <NavBar />
            </View>
        );
    }
}


const styles = {
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#dcdfe5',
  }
}
export default Test;
                                /*<Footer >
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
                            <Text>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>*/