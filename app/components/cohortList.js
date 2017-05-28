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
  constructor (props) {
  super(props)
    this.state = {
      allStudentData: [],
      studentCohorts: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/teachers/grfg1@grfg.pbz')
    .then(res => {
      console.log('this is the res from cohort ', res);
      this.setState({ allStudentData: res.data });
      this.setState({ studentCohorts: res.data.cohort });
  });
}

render() {
  console.log('this is all the student datata ', this.state.allStudentData);
  console.log('this is all the students cohorts', this.state.studentCohorts)
  const allData = this.state.allStudentData;
  return (
    <View>
        {this.state.studentCohorts.map(cohort =>
          (<CohortListEntry id={cohort.id} cohort={cohort}/>))}          
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
