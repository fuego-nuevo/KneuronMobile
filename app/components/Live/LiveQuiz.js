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
// import CountDown from 'react-native-countdown';
import Config from 'react-native-config';

const socket = io(`${Config.Local_Host}`);

class LiveQuiz extends Component {
  constructor({ quiz, profile }) {
  // constructor(props) {
    super({ quiz, profile });
    // super(props);
    this.state = {
      questions: null,
      correct: 0,
      secondsRemaining: 1,
      selectedAnswers: {
        student_id: profile.id,
      },
    };
    this.submitAnswers = this.submitAnswers.bind(this);
    this.gradeAnswers = this.gradeAnswers.bind(this);
    this.postAnswersToDB = this.postAnswersToDB.bind(this);
    this.postResultsToDB = this.postResultsToDB.bind(this);
    this.timerTick = this.timerTick.bind(this);
  }

  componentDidMount() {
    const { quiz } = this.props;
    this.setState({ secondsRemaining: quiz.time });
    typeof this.state.secondsRemaining === 'number' ? setInterval(this.timerTick, 1000) : null;
  }

  timerTick() {
    // this.state.secondsRemaining > 0 ? this.setState({ secondsRemaining: this.state.secondsRemaining - 1 }
    if (this.state.secondsRemaining === 0) {
      this.setState({ secondsRemaining: '' });
      Actions.pop();
    } else {
      this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
    }
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
            <Text style={styles.center} key={question.id}>Question is {question.name}</Text>
            <View style={styles.boxes}>
              <Text onPress={() => this.handleSelectedAnswer(question.id, 0)}>{question.choices[0]}</Text>
            </View>
            <View style={styles.boxes}>
              <Text  onPress={() => this.handleSelectedAnswer(question.id, 1)}>{question.choices[1]}</Text>
            </View>
            <View style={styles.boxes}>
              <Text  onPress={() => this.handleSelectedAnswer(question.id, 2)}>{question.choices[2]}</Text>
            </View>
            <View style={styles.boxes}>
              <Text  onPress={() => this.handleSelectedAnswer(question.id, 3)}>{question.choices[3]}</Text>
            </View>
          </View>,
        )}
        <TouchableOpacity style={{borderWidth: 3, borderColor: 'black', width: '30%', textAlign: 'center', borderRadius: 5, marginLeft: '35%', backgroundColor: '#da0576' }} >
          <Text onPress={this.submitAnswers} style={{textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 80,
    backgroundColor: 'gray',
  },
  center: {
    textAlign: 'center',
    marginBottom: 15,
  },
  boxes: {
    width: '60%',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255, .5)',
    borderColor: 'black',
    marginBottom: 15,
    textAlign: 'center',
    height: 20,
    marginLeft: '20%',
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
