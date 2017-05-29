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
import NavBar from './NavBar/NavBar';
import CohortList from './Cohorts/CohortList';

// import { Icons } from 'react-native-vector-icons'

export default class Test extends Component {
  render() {
    return (
      <Container style={{ padding: 80, borderColor: 'black', borderStyle: 'solid', borderWidth: 10 }}>
        <CohortList />
      </Container>
    );
  }
}
