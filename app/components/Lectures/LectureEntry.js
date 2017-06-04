import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { currentLecture } from '../../actions/CurrentLecture';

class LectureEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live: true,
    };

    this.onLiveClassJoin = this.onLiveClassJoin.bind(this);
  }

  async onLiveClassJoin() {
    const { lecture, currentLecture } = this.props;
    await currentLecture(lecture.topics);
    return this.state.live ? Actions.livelecture() : null;
  }

  render() {
    const { lecture } = this.props;
    const { container, title, text, join } = styles;
    console.log(this.props);
    return (
      <View style={container}>
        <View style={join}>
          <Icon name="apps" onPress={this.onLiveClassJoin} />
        </View>
        <View style={title}>
          <Text style={text}>{lecture.name}</Text>
        </View>
        <View>
          <Text style={text}>{lecture.date}</Text>
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: .2,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Futura-Medium',
  },
  title: {
    // flex: 1,
    position: 'absolute',
    backgroundColor: '#a3b2cc',
    padding: 3,
    width: '100%',
    top: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '15%',
  },
  join: {
    position: 'absolute',
    right: 5,
    top: 25,
  },
};

export default connect(null, { currentLecture })(LectureEntry);
