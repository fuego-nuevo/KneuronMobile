import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';

class LiveQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: null,
    }

    this.handleSelectedAnswer = this.handleSelectedAnswer.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  handleSelectedAnswer(choice) {
    this.setState({ selectedAnswer: choice });
    console.log('this is the state of selectedAnswer ', `${this.props.question.id} ${this.state.selectedAnswer}`);
  }

  handleAnswerSubmit() {
    const { question, profile } = this.props;
    axios.post(`${Config.Local_Host}/api/answers`, {
      selected: this.state.selectedAnswer,
      question_id: question.id,
      student_id: profile.id,
    })
  }

  render() {
    const { question } = this.props;
    return (
      <View key={question.id}>
        <Text>{question.name}</Text>
        <Text onPress={() => this.handleSelectedAnswer(0)}>{question.choices[0]}</Text>
        <Text onPress={() => this.handleSelectedAnswer(1)}>{question.choices[1]}</Text>
        <Text onPress={() => this.handleSelectedAnswer(2)}>{question.choices[2]}</Text>
        <Text onPress={() => this.handleSelectedAnswer(3)}>{question.choices[3]}</Text>
        <Text>Submit</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(LiveQuestion);
