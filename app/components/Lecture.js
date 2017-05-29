import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../components/NavBar';
import LectureList from '../components/LectureList';

class LectureHome extends Component {
  render(){
    const { container } = styles;
    return (
    <View style={container}>
      <LectureList />
      <NavBar />
    </View>
    );
  }
}

styles = {
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#dcdfe5',
  }
}

export default LectureHome;