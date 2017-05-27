import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';

import CohortListEntry from './cohortListEntry'

// import Navigator from 'react-native-deprecated-custom-components';


export default class CohortList extends Component {
    constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
       <CohortListEntry />

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  }
})
    /*return (
        <View style={styles.logoContainer}>
          <Text>Cohorts List</Text>
          <CohortListEntry />
        </View>

    );*/
    /*return (
      <Container>
        <Content>
          <List>
            <CohortListEntry />
          </List>
        </Content>
      </Container>
    )
  }*/