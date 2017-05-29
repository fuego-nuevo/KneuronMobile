import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import NavBar from './NavBar';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import CohortListEntry from './CohortListEntry';

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

class CohortList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudentData: [],
      studentCohorts: [],
    };
  }

  componentDidMount() {
    // axios.get('http://localhost:8080/api/teachers/grfg1@grfg.pbz')
    // .then((res) => {
    //   console.log('this is the res from cohort ', res);
    //   this.setState({ allStudentData: res.data });
    //   this.setState({ studentCohorts: res.data.cohort });
    // });
    console.log('hey');
  }

render() {
  console.log('this is all the student datata ', this.state.allStudentData);
  console.log('this is all the students cohorts', this.state.studentCohorts);
  console.log('this is th epropss brroosksk , ', this.props);
  const allData = this.state.allStudentData;
  const { container } = styles;
  return (
    <ScrollView style={container}>
        {this.state.studentCohorts.map(cohort =>
          (<CohortListEntry key={cohort.id} id={cohort.id} cohort={cohort}/>))}
    </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '20%'
  },
  navBar: {
    position: 'fixed',
    bottom: 0,
  }
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(CohortList);
