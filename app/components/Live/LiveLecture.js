import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client';
import axios from 'axios';
import { currentQuiz } from '../../actions/CurrentQuiz';

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
    this.handlePopQuiz = this.handlePopQuiz.bind(this);
  }

  componentDidMount() {
    const { teacher, currentQuiz } = this.props;
    socket.emit('join', { id: teacher.teacher_id });
    socket.on('live-lecture');
    socket.on('pop-quiz', (quizQuestion) => {
      console.log('Quiz received', quizQuestion);
      // quizQuestion = JSON.parse(quizQuestion);
      this.handlePopQuiz(quizQuestion);
    });
  }

  setModalVisible(visible) {
    this.setState({ isShowingQuizModal: visible });
  }

  handleStudentQuestionSubmit() {
    const { profile, teacher } = this.props;
    socket.emit('student-question', {
      topicId: this.state.selectedTopic,
      name: `${profile.fName} ${profile.lName}`,
      question: this.state.question,
      teacher: teacher.teacher_id,
    });
    return axios.post('http://localhost:8080/api/studentQuestions', {
      question: this.state.question,
      topic_id: this.state.selectedTopic,
      student_id: profile.id,
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

  async handlePopQuiz(quizQuestion) {
    const { currentQuiz } = this.props;
    await currentQuiz(quizQuestion);
    return Actions.livequiz();
  }

  render() {
    const { topics } = this.props;
    const { container, input, buttonContainer, buttonText } = styles;
    console.log('this.props', this.props);
    return (
      <View style={container}>
        {topics.map(topic =>
          <Text key={topic.id} onPress={() => this.handleTopicPress(topic.id)}>{topic.name}</Text>)}
        <TextInput style={input} type="text" placeholder="Ask a Question" onChangeText={this.handleStudentQuestionInputChange} />
        <TouchableOpacity style={buttonContainer}>
          <Text style={buttonText} onPress={this.handleStudentQuestionSubmit} > Ask! </Text>
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
  topics: state.currentLecture,
  profile: state.profile,
  teacher: state.currentCohort,
});

export default connect(mapStateToProps, { currentQuiz })(LiveLecture);
