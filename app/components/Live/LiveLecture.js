import React, { Component } from 'react';
import {
  View,
  Form,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const socket = io('http://localhost:5000');
// const socket = io();

class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      selectedTopic: null,
    };

    this.handleStudentQuestionSubmit = this.handleStudentQuestionSubmit.bind(this);
    this.handleStudentQuestionInputChange = this.handleStudentQuestionInputChange.bind(this);
    this.handleTopicPress = this.handleTopicPress.bind(this);
  }

  componentDidMount() {
    socket.on('live-lecture');
    socket.on('pop-quiz', () => {
      console.log('Quiz received');
    });
  }

  handleStudentQuestionSubmit() {
    const { studentQuestion } = this.props;
    socket.emit('student-question', { studentQuestion });
    return axios.post('http://localhost:8080/api/studentQuestions', {
      question: this.state.question,
      topic_id: this.state.selectedTopic,
      student_id: this.props.profile.id,
    })
      .then((data) => {
        console.log(data);
        this.setState({ question: '' });
      })
      .catch(err => console.log(err));
  }

  handleStudentQuestionInputChange(text) {
    this.setState({ question: text });
  }

  handleTopicPress(id) {
    this.setState({ selectedTopic: id });
  }

  render() {
    const { topics } = this.props;
    return (
      <View style={{ padding: 100 }}>
        {topics.map(topic =>
          <Text key={topic.id} onPress={() => this.handleTopicPress(topic.id)}>{topic.name}</Text>)}
        <TextInput style={styles.input} type="text" placeholder="Ask a Question" onChangeText={this.handleStudentQuestionInputChange} />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.handleStudentQuestionSubmit} > Ask! </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={Actions.cameraroute}>Attendance</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,255,0.3)',
    marginBottom: 10,
    color: '#D3D3D3',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

const mapStateToProps = state => ({
  topics: state.currentLecture,
  profile: state.profile,
});

export default connect(mapStateToProps)(LiveLecture);
