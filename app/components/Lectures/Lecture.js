import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../NavBar/NavBar';
import LectureList from './LectureList';

class LectureHome extends Component {
  render() {
    return (
      <View>
        <LectureList />
        <NavBar />
      </View>
    );
  }
}

export default LectureHome;
