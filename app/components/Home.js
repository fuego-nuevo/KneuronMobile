import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/UpdateProfile';
import axios from 'axios';
import {
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import NavBar from './NavBar';
import CohortList from './CohortList';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token')
      .then((res) => {
        axios.get(`http://localhost:8080/api/students/${res}`)
          .then((profile) => {
            this.setState({ profile: profile.data}, () => {
              this.props.updateProfile(profile.data);
            })
          })
          .catch((err) => {
            console.log('there was an error grabbing student info, ', err);
          })
      })
  }

  render() {
    const { container } = styles;
    console.log(this.state);
        return (
            <View style={container}>
              <CohortList cohorts={this.state.profile.studentcohorts || []} />
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

