/*import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

// import Navigator from 'react-native-deprecated-custom-components';


export default class CohortListEntry extends Component {
    constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <View style={styles.logoContainer}>
          <Text >Cohort list entries</Text>
          
        </View>

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
})*/

import React, { Component } from 'react'
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
      const { container } = styles;
        return (
          <Container style={{marginTop: 70}}>
            <ListItem avatar >
            <Left>
            <Thumbnail source={require('./images/loginpic.jpg')} />
            </Left>
            <Body >
            <Text > dljalfdjlfjs{this.props.cohort.subject}</Text>
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
    // flex: 1,
    backgroundColor: '#3498db',
    marginTop: 5,
    marginBottom: 5,
  },
  Body: {
    marginTop: 70,
    alignItems: 'center',
    // flexGrow: 1,
    justifyContent: 'center',
    borderStyle: "solid",
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
    // marginTop: 10,
    width: 160,
    textAlign: 'center',
  },
});

          /*<Container style={{marginTop: 70}}>
                <Content>
            <ListItem>
              <ListItem avatar>
                  <Left>
                      <Thumbnail source={require('./images/loginpic.jpg')} />
                  </Left>
                  <Body style={styles.Body}>
                      <Text style={{padding:20, width: 40}}>CS 101</Text>
                      <ScrollView>
                        <Text note style={{padding: 70, width: 160, flexGrow: 1, height: 100}}>Lets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code YallLets code Yall</Text>
                      </ScrollView>
                  </Body>
                  <Right>
                      <Text note>3:43 pm</Text>
                  </Right>
              </ListItem>
            </ListItem>
          </Content>
        </Container>*/