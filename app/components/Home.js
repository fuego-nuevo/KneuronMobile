import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/UpdateProfile';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import NavBar from './NavBar';
import CohortList from './CohortList';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/api/students/${AsyncStorage.getItem('id_token')}`)
      .then((profile) => {
        this.props.updateProfile(profile);
      })
      .catch((err) => {
        console.log('there was an error grabbing student info, ', err);
      })
  }

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

export default connect(null, { updateProfile })(Test);

