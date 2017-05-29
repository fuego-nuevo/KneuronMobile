import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client';
import NavBar from './NavBar/NavBar';
import CohortList from './Cohorts/CohortList';


const socket = io('http://localhost:5000');

export default class Home extends Component {
  componentDidMount() {
    socket.on('live-lecture');
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
  },
};
