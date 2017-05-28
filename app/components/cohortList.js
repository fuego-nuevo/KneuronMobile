import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import navbar from './Navbar';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import CohortListEntry from './CohortListEntry'

// import Navigator from 'react-native-deprecated-custom-components';


  let cards = [
    {
        text: 'CS 101',
        name: 'One',
        image: require('./images/loginpic.jpg'),
    },
    {
        text: 'CS 202',
        name: 'two',
        image: require('./images/loginpic.jpg'),
    },
    {
        text: 'CS 302',
        name: 'two',
        image: require('./images/loginpic.jpg'),
    },

];
export default class CohortList extends Component {
    constructor(props) {
    super(props);
    this.state = {};

  }
componentDidMount() {
        axios.get('http://localhost:8080/api/teachers/grfg1@grfg.pbz')
      .then(res => {
        console.log('this is the res from cohort ',res);

      })
}
  render() {
    return (
      //  <CohortListEntry />
                      <View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ width: 320, borderColor: "black", borderStyle: "solid", borderWidth: 10, justifyContent: "center",backgroundColor: 'blue'}}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text note>Intro to CS101</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{  width: 200, height: 200 }} source={item.image} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="ios-heart" />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
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