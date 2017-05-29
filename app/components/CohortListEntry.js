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
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
export default class CohortListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onClassJoin() {

  }

    render() {
      console.log('this is the props in cohortlistentry', this.props)
      const { container, text, time, title, join } = styles;
        return (
          <View style={container}>
            <View style={join}>
              <Icon name="apps" />
            </View>
            <View style={title}>
              <Text style={text}>
                {this.props.cohort.subject}
              </Text>
            </View>
            <View style={time}>
              <Text>Class starts at {this.props.cohort.time}</Text>
            </View>
        </View>
        );
    }
}


const styles = {
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 175,
    width: '90%',
    marginLeft: '5%',
    borderColor: '#ddd',
    borderRadius: 5,
    borderBottomWidth: 0,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .2,
  },
  text: {
    textAlign: 'center',
    textColor: 'white',
  },
  title: {
    // flex: 1,
    position: 'absolute',
    backgroundColor: 'lightgray',
    padding: 3,
    width: '100%',
    top: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '15%',
  },
  time: {
    position: 'absolute',
    bottom: 20,
    height: 10,
    // backgroundColor: 'blue',
    width: '90%',
    borderTopWidth: 1,
    padding: 4,
    borderColor: 'lightgray',
  },
  join: {
    position: 'absolute',
    right: 5,
    top: 25,
  }
}
