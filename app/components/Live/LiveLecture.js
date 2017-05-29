import React, { Component } from 'react';
import {
  View,
  Form,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8081');

// export default class LiveLecture extends Component {
export default class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      selectedTopic: null,
    };

    // this.socket = io('http://localhost:8081');

    this.handleStudentQuestionSubmit = this.handleStudentQuestionSubmit.bind(this);
    this.handleStudentQuestionInputChange = this.handleStudentQuestionInputChange.bind(this);
    this.handleTopicClick = this.handleTopicClick.bind(this);
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
    axios.post('/api/studentQuestions', { question: this.state.question, topic_id: topic.id, student_id: id });
  }

  handleStudentQuestionInputChange(event) {
    event.preventDefault();
    this.setState({ question: event.target.value });
  }

  handleTopicClick(event) {
    event.preventDefault();
    this.setState({ selectedTopic: event.target.value });
  }

  handleQuestionSubmit() {
    const { studentQuestion } = this.props;
    socket.emit('student-question', { studentQuestion });
    axios.post('/api/studentQuestions', { question: this.state.question, topic_id: topic.id, student_id: id });
  }

  // sendStudentQuestion(){
    // axios.post('/api/')
  // }

  render() {
    const { topics } = this.props;
    return (
      <View>
        {topics.map(topic => <h1>{topic.name} onPress={this.handleTopicClick}</h1>)}
        <Form onSubmitEditing={this.handleStudentQuestionSubmit}>
          <TextInput type="text" placeholder="Ask a Question" onChangeText={this.handleStudentQuestionInputChange} />
        </Form>
      </View>
    );
  }
}

// const mapStateToProps = state => ({

// })

