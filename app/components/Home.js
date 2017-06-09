import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  AsyncStorage,
} from 'react-native';
import { Container, View, Icon, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Footer, FooterTab, Button } from 'native-base';
import io from 'socket.io-client';
import Config from 'react-native-config';

import { updateProfile } from '../actions/UpdateProfile';
import NavBar from './NavBar/NavBar';
import CohortList from './Cohorts/CohortList';

const socket = io('http://localhost:5000');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
    this.getCorhortList = this.getCorhortList.bind(this);
  }

  componentDidMount() {
    socket.on('live-lecture');
    AsyncStorage.getItem('id_token')
      .then((res) => {
        axios.get(`${Config.Local_Host}/api/students/${res}`)
          .then(({ data }) => {
            console.log("this is the profile data from home!!!!!!!!!!!!!", data)
            this.setState({ profile: data }, () => {
              this.props.updateProfile(data);
            })
          })
          .catch((err) => {
            console.log('there was an error grabbing student info, ', err);
          })
      })
      .catch(error => console.log('Error in CDM of Home ', error));
  }

  getCorhortList() {
    AsyncStorage.getItem('id_token')
      .then((res) => {
        axios.get(`${Config.Local_Host}/api/students/${res}`)
          .then((profile) => {
            console.log("this is the profile data from home!!!!!!!!!!!!!", profile.data)
            this.setState({ profile: profile.data }, () => {
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
          <CohortList cohorts={this.state.profile.studentcohorts || []} getCorhortList={this.getCorhortList} />
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

export default connect(null, { updateProfile })(Home);
