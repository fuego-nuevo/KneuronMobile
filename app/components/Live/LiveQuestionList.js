import React from 'react';
import {
  View,
} from 'react-native';
import LiveQuestion from './LiveQuestion';

const LiveQuestionList = (props) => {
  console.log('this is the prop in mafuckin livequestionlist ', props.questions);
  const { questions } = this.props;
  return (
    <View>
      {questions.map(question => 
        <LiveQuestion key={question.id} question={question} />)}
    </View>
  );
};

export default LiveQuestionList;
