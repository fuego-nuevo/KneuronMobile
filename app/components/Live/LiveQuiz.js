import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';
import io from 'socket.io-client';
import TimerMixin from 'react-timer-mixin';
import Config from 'react-native-config';

const socket = io(`${Config.Local_Host}`);

class LiveQuiz extends Component {
  constructor({ quiz, profile }) {
  // constructor(props) {
    super({ quiz, profile });
    // super(props);
    this.state = {
      questions: null,
      secondsRemaining: 1,
      correct: 0,
      selectedAnswers: {
        // student_id: this.props.profile.id,
        student_id: profile.id,
      },
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.gradeAnswers = this.gradeAnswers.bind(this);
    this.postAnswersToDB = this.postAnswersToDB.bind(this);
    this.timerTick = this.timerTick.bind(this);
  }

  componentDidMount() {
    const { quiz } = this.props;
    this.setState({ secondsRemaining: quiz.time });
    this.state.secondsRemaining > 0 ? setInterval(this.timerTick, 1000) : null;
  }

  timerTick() {
    // this.state.secondsRemaining > 0 ? this.setState({ secondsRemaining: this.state.secondsRemaining - 1 }
    this.state.secondsRemaining > 0 ? this.setState({ secondsRemaining: this.state.secondsRemaining - 1 }) :
    this.postAnswersToDB();
    Actions.pop();
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
    return this.state.correct / questions.length;
  }

  postAnswersToDB() {
    const { profile } = this.props;
    console.log('this is the type of profile id ', typeof profile.id);
    _.each(this.state.selectedAnswers, (choice, questionId) => {
      axios.post(`${Config.Local_Host}/api/answers`, {
        selected: choice,
        question_id: questionId,
        student_id: profile.id,
      })
        .then(data => console.log(data))
        .catch(error => console.log('Error in postAnswersToDB ', error));
    });
  }

  postResultsToDB() {
    const { cohort, profile, lecture_id, quiz } = this.props;
    axios.post(`${Config.Local_Host}/api/results`, {
      student_id: profile.id,
      quiz_id: quiz.id,
      cohort_id: cohort.id,
      lecture_id,
      percentage: this.gradeAnswers(this.state.selectedAnswers),
    })
      .then(data => console.log(data))
      .catch(error => console.log('Error in postResultsToDB ', error));
  }

  async submitAnswers() {
    const { profile, cohort, quiz } = this.props;
    const questions = JSON.parse(quiz.questions);
    if (Object.keys(this.state.selectedAnswers).length > questions.length) {
      socket.emit('student-answers', {
        correct: this.gradeAnswers(this.state.selectedAnswers),
        name: `${profile.fName} ${profile.lName}`,
        teacher: cohort.teacher_id,
      });
      await this.postAnswersToDB();
      await this.postResultsToDB();
      Actions.pop();
    } else {
      Alert.alert(
        'All questions have not been answered!',
        'Go back and check your answers',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    const { container } = styles;
    const { quiz, profile } = this.props;
    const questions = JSON.parse(quiz.questions);
    return (
      <View style={container}>
        <Text>Time Remaining: {this.state.secondsRemaining}</Text>
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
  cohort: state.currentCohort,
});

export default connect(mapStateToProps)(LiveQuiz);
