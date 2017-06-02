import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import io from 'socket.io-client';

const socket = io();

class LiveQuiz extends Component {
  // constructor({ quiz, profile }) {
  constructor(props) {
    // super({ quiz, profile });
    super(props);
    this.state = {
      questions: null,
      correct: 0,
      selectedAnswers: {
        student_id: this.props.profile.id,
      },
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.gradeAnswers = this.gradeAnswers.bind(this);
    this.postAnswersToDB = this.postAnswersToDB.bind(this);
  }

  componentDidMount() {
    // this.setState({ questions: questions });
    // console.log('these are the questions in CDM ', this.state.questions);
    const { quiz } = this.props;
    const questions = JSON.parse(quiz.questions);
    const answerObj = {};
    _.each(questions, question => {
      answerObj[question.id] = null;
    });
    Object.assign(this.state.selectedAnswers, answerObj);
  }

  handleSelectedAnswer(id, selected) {
    this.setState({ selectedAnswers: { ...this.state.selectedAnswers, [id]: selected } });
  }

  gradeAnswers() {
    const { quiz, profile } = this.props;
    const questions = JSON.parse(quiz.questions);
    _.each(questions, question => {
      _.each(this.state.selectedAnswers, (choice, questionId) => {
        if (question.id === parseInt(questionId, 10)) {
          if (choice === question.correct) {
            this.state.correct += 1;
          }
        }
      });
    });
    return this.state.correct;
  }

  postAnswersToDB() {
    const { profile } = this.props;
    _.each(this.state.selectedAnswers, (choice, questionId) => {
      axios.post('http://localhost:8080/api/answers', {
        selected: choice,
        question_id: questionId,
        student_id: profile.id,
      })
        .then(data => console.log(data))
        .catch(error => console.log('Error in submitAnswers ', error));
    });
  }

  async submitAnswers() {
    const { profile } = this.props;
    socket.emit('student-answers', {
      student_id: profile.id,
      correct: this.gradeAnswers(this.state.selectedAnswers),
    });
    this.postAnswersToDB();
  }

  render() {
    const { container } = styles;
    const { quiz } = this.props;
    const questions = JSON.parse(quiz.questions);
    console.log(questions);
    return (
      <View style={container}>
        {questions.map(question =>
          <View>
            <Text key={question.id}>{question.name}</Text>
            <Text onPress={() => this.handleSelectedAnswer(question.id, 0)}>{question.choices[0]}</Text>
            <Text onPress={() => this.handleSelectedAnswer(question.id, 1)}>{question.choices[1]}</Text>
            <Text onPress={() => this.handleSelectedAnswer(question.id, 2)}>{question.choices[2]}</Text>
            <Text onPress={() => this.handleSelectedAnswer(question.id, 3)}>{question.choices[3]}</Text>
          </View>,
        )}
        <Text onPress={this.submitAnswers}>Submit</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 80,
    backgroundColor: 'gray',
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
};

const mapStateToProps = state => ({
  quiz: state.currentQuiz,
  profile: state.profile,
});

export default connect(mapStateToProps)(LiveQuiz);
