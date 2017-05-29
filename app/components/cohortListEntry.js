import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Body, Left, Right } from 'native-base';

export default class CohortListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log('this is the props in cohortlistentry', this.props)
    return (
      <Container style={{ marginTop: 70 }}>
        <ListItem avatar >
          <Left>
            <Thumbnail source={require('./images/loginpic.jpg')} />
          </Left>
          <Body >
            <Text >{this.props.cohort.subject}</Text>
            <Text note>Lets code Yall</Text>
          </Body>
          <Right>
            <Text note>{this.props.cohort.time}</Text>
          </Right>
        </ListItem>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  Body: {
    marginTop: 70,
    alignItems: 'center',
    // flexGrow: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 5, 
    borderColor: 'black',
    width: 100,
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
  },
});
