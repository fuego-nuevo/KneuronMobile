import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client';
import Config from 'react-native-config';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Navbar from '../NavBar/NavBar';
import { currentQuiz } from '../../actions/CurrentQuiz';

const { width, height } = Dimensions.get('window');

const socket = io(`${Config.Local_Host}`);

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
    socket.on('attendance', () => {
      Toast.show('Teacher is tracking attendance now', Toast.LONG) });
    socket.on('pop-quiz', (quizQuestion) => {
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
    return axios.post(`${Config.Local_Host}/api/studentQuestions`, {
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
    return (
      <View style={container}>
        {topics.map(topic =>
          <Text style={{textAlign: 'center'}} key={topic.id} onPress={() => this.handleTopicPress(topic.id)}>{topic.name}</Text>)}
        <TextInput style={input} type="text" placeholder="Ask a Question" onChangeText={this.handleStudentQuestionInputChange} />
        <TouchableOpacity style={buttonContainer}>
          <Text style={buttonText} onPress={this.handleStudentQuestionSubmit} > Ask! </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={Actions.cameraroute}>Attendance</Text>
        </TouchableOpacity>
        <View style={{position: 'absolute', bottom: 0, width: '100%' }}>
          <Navbar />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 70,
    height: height,
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
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
};

const mapStateToProps = state => ({
  topics: state.CurrentLectureTopics,
  profile: state.profile,
  teacher: state.currentCohort,
});

export default connect(mapStateToProps, { currentQuiz })(LiveLecture);
