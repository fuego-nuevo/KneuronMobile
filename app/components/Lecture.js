import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../components/NavBar';
import LectureList from '../components/LectureList';

class LectureHome extends Component {
  render(){
    return (
    <View>
      <LectureList />
      <NavBar />
    </View>
    );
  }
}

export default LectureHome;