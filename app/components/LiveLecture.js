import React, { Component } from 'react';
import {
  View,
  Form,
} from 'react-native';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

// const socket = io();

// export default class LiveLecture extends Component {
export default class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };

    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
  }

  componentDidMount() {
    // socket.on('live-lecture');
    // socket.on('pop-quiz', () => {
    //   console.log('Quiz received');
    // });
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
        {topics.map(topic => <h1>{topic.name}</h1>)}
        <Form>
        </Form>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
  
// })

// export default connect(mapStateToProps)(LiveLecture);
